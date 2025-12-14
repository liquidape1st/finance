package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Blog;
import com.example.finance.model.BlogTranslation;
import com.example.finance.model.Category;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.BlogTranslationRepository;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.repository.BlogRepository;
import com.example.finance.schemas.request.BlogPostRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogService extends BaseService<Blog, UUID> implements AService<Blog, BlogPostRequest, UUID> {

    BlogRepository blogRepository;
    CategoryRepository categoryRepository;
    BlogTranslationRepository blogTranslationRepository;

    @Override
    public List<Blog> findAllEntities() {
        return blogRepository.findAll();
    }

    @Override
    public Page<Blog> searchEntities(@NotNull PageableObject pageableObject) {
        return blogRepository.search(pageableObject.getQuery(), pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public Blog createEntity(BlogPostRequest request) {
        // Check if slug already exists for this language
        if (blogTranslationRepository.existsByLangCodeAndSlug(request.getLangCode(), request.getSlug())) {
            throw new IllegalArgumentException(
                    String.format("Blog translation with slug '%s' already exists for language '%s'", 
                            request.getSlug(), request.getLangCode())
            );
        }

        Blog post = new Blog();
        mapRequestToEntity(post, request);
        post.setBlogCategory(findBlogCategoryById(request.getBlogCategoryId()));
        post.setPublishedAt(LocalDateTime.now());
        
        // Create translation for the blog post
        BlogTranslation translation = new BlogTranslation();
        translation.setLangCode(request.getLangCode());
        translation.setSlug(request.getSlug());
        translation.setTitle(request.getTitle());
        translation.setContent(request.getContent());
        translation.setExcerpt(request.getExcerpt());
        translation.setPost(post);
        post.getTranslations().add(translation);
        
        return blogRepository.save(post);
    }

    @Override
    @Transactional
    public Blog updateEntityById(UUID id, BlogPostRequest request) {
        Blog post = findByIdOrThrow(id);
        mapRequestToEntity(post, request);
        post.setBlogCategory(findBlogCategoryById(request.getBlogCategoryId()));
        
        // Update or create translation for the specified language
        BlogTranslation translation = blogTranslationRepository
                .findByPostIdAndLangCode(id, request.getLangCode())
                .orElse(null);
        
        if (translation == null) {
            // Create new translation if it doesn't exist
            if (blogTranslationRepository.existsByLangCodeAndSlug(request.getLangCode(), request.getSlug())) {
                throw new IllegalArgumentException(
                        String.format("Blog translation with slug '%s' already exists for language '%s'", 
                                request.getSlug(), request.getLangCode())
                );
            }
            translation = new BlogTranslation();
            translation.setPost(post);
            post.getTranslations().add(translation);
        } else {
            // Check if slug is being changed and if new slug already exists
            if (!translation.getSlug().equals(request.getSlug()) && 
                blogTranslationRepository.existsByLangCodeAndSlug(request.getLangCode(), request.getSlug())) {
                throw new IllegalArgumentException(
                        String.format("Blog translation with slug '%s' already exists for language '%s'", 
                                request.getSlug(), request.getLangCode())
                );
            }
        }
        
        translation.setLangCode(request.getLangCode());
        translation.setSlug(request.getSlug());
        translation.setTitle(request.getTitle());
        translation.setContent(request.getContent());
        translation.setExcerpt(request.getExcerpt());
        
        return blogRepository.save(post);
    }

    @Override
    public Blog findEntityById(UUID id) {
        return findByIdOrThrow(id);
    }

    @Override
    @Transactional
    public void removeEntityById(UUID id) {
        blogRepository.delete(findByIdOrThrow(id));
    }

    @Override
    @Transactional
    public List<Blog> removeEntitiesByIds(List<UUID> ids) {
        return deleteByIds(ids);
    }

    @Override
    public void mapRequestToEntity(Blog entity, BlogPostRequest request) {
        setIfNotNull(entity::setImage, request.getImage());
        setIfNotNull(entity::setAuthor, request.getAuthor());
        setIfNotNull(entity::setEstimatedReadTime, request.getEstimatedReadTime());
    }

    @Override
    protected JpaRepository<Blog, UUID> getRepository() {
        return blogRepository;
    }

    @Override
    protected String getEntityName() {
        return "BlogPost";
    }

    private Category findBlogCategoryById(java.util.UUID blogCategoryId) {
        return categoryRepository.findById(blogCategoryId).orElseThrow(() -> new EntityNotFoundException("Blog category", blogCategoryId));
    }

    // Additional methods for multi-language support
    public BlogTranslation findTranslationByPostIdAndLangCode(UUID postId, String langCode) {
        return blogTranslationRepository.findByPostIdAndLangCode(postId, langCode)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Blog translation for post %s and language %s", postId, langCode), 
                        postId)
                );
    }

    public List<BlogTranslation> findTranslationsByPostId(UUID postId) {
        return blogTranslationRepository.findByPostId(postId);
    }

    public BlogTranslation findTranslationByLangCodeAndSlug(String langCode, String slug) {
        return blogTranslationRepository.findByLangCodeAndSlug(langCode, slug)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Blog translation with slug '%s' and language '%s'", slug, langCode), 
                        slug)
                );
    }

    public List<Blog> findByLangCode(String langCode) {
        return blogTranslationRepository.findByLangCode(langCode)
                .stream()
                .map(BlogTranslation::getPost)
                .distinct()
                .toList();
    }
}

