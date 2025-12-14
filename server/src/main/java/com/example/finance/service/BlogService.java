package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Blog;
import com.example.finance.model.BlogTranslation;
import com.example.finance.model.Category;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.BlogRepository;
import com.example.finance.repository.BlogTranslationRepository;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.schemas.request.BlogRequest;
import com.example.finance.schemas.request.BlogTranslationRequest;
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
public class BlogService extends BaseService<Blog, UUID> implements AService<Blog, BlogRequest, UUID> {

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
    public Blog createEntity(BlogRequest request) {
        Blog blog = new Blog();
        mapRequestToEntity(blog, request);
        blog.setCategory(findBlogCategoryById(request.getCategory().getId()));
        List<BlogTranslationRequest> listBlogTranslationRequest = request.getTranslations();
        for (BlogTranslationRequest blogTranslationRequest : listBlogTranslationRequest) {
            BlogTranslation translation = new BlogTranslation();
            mapBlogTranslation(blog, blogTranslationRequest, translation);
        }
        // Set time publish
        blog.setPublishedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public Blog updateEntityById(UUID id, BlogRequest request) {
        Blog blog = findByIdOrThrow(id);
        mapRequestToEntity(blog, request);
        blog.setCategory(findBlogCategoryById(request.getCategory().getId()));

        List<BlogTranslationRequest> listBlogTranslationRequest = request.getTranslations();
        for (BlogTranslationRequest blogTranslationRequest : listBlogTranslationRequest) {
            BlogTranslation translation = blogTranslationRepository.findById(blogTranslationRequest.getId()).orElse(new BlogTranslation());
            mapBlogTranslation(blog, blogTranslationRequest, translation);
        }
        return blogRepository.save(blog);
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
    public void mapRequestToEntity(Blog entity, BlogRequest request) {
        setIfNotNull(entity::setImage, request.getImage());
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

    private void mapBlogTranslation(Blog blog, BlogTranslationRequest blogTranslationRequest, BlogTranslation translation) {
        translation.setLangCode(blogTranslationRequest.getLangCode());
        translation.setSlug(blogTranslationRequest.getSlug());
        translation.setTitle(blogTranslationRequest.getTitle());
        translation.setContent(blogTranslationRequest.getContent());
        translation.setExcerpt(blogTranslationRequest.getExcerpt());
        translation.setBlog(blog);
        blog.getTranslations().add(translation);
    }
}

