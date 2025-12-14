package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Blog;
import com.example.finance.model.BlogTranslation;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.BlogRepository;
import com.example.finance.repository.BlogTranslationRepository;
import com.example.finance.schemas.request.BlogTranslationRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationService extends BaseService<BlogTranslation, UUID> implements AService<BlogTranslation, BlogTranslationRequest, UUID> {

    BlogTranslationRepository blogTranslationRepository;
    BlogRepository blogRepository;

    @Override
    public List<BlogTranslation> findAllEntities() {
        return blogTranslationRepository.findAll();
    }

    @Override
    public Page<BlogTranslation> searchEntities(@NotNull PageableObject pageableObject) {
        // Simple search implementation - can be enhanced with proper query
        return blogTranslationRepository.findAll(pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public BlogTranslation createEntity(BlogTranslationRequest request) {
        // Check if slug already exists for this language
        if (blogTranslationRepository.existsByLangCodeAndSlug(request.getLangCode(), request.getSlug())) {
            throw new IllegalArgumentException(
                    String.format("Blog translation with slug '%s' already exists for language '%s'", 
                            request.getSlug(), request.getLangCode())
            );
        }

        BlogTranslation translation = new BlogTranslation();
        mapRequestToEntity(translation, request);
        
        // If postId is provided, link to existing post
        if (request.getPostId() != null) {
            Blog post = blogRepository.findById(request.getPostId())
                    .orElseThrow(() -> new EntityNotFoundException("Blog", request.getPostId()));
            
            // Check if translation already exists for this post and language
            if (blogTranslationRepository.existsByPostIdAndLangCode(request.getPostId(), request.getLangCode())) {
                throw new IllegalArgumentException(
                        String.format("Translation for language '%s' already exists for this blog post", 
                                request.getLangCode())
                );
            }
            
            translation.setPost(post);
            post.getTranslations().add(translation);
        }
        
        return blogTranslationRepository.save(translation);
    }

    @Override
    @Transactional
    public BlogTranslation updateEntityById(UUID id, BlogTranslationRequest request) {
        BlogTranslation translation = findByIdOrThrow(id);
        
        // Check if slug is being changed and if new slug already exists
        if (!translation.getSlug().equals(request.getSlug()) && 
            blogTranslationRepository.existsByLangCodeAndSlug(request.getLangCode(), request.getSlug())) {
            throw new IllegalArgumentException(
                    String.format("Blog translation with slug '%s' already exists for language '%s'", 
                            request.getSlug(), request.getLangCode())
            );
        }
        
        mapRequestToEntity(translation, request);
        return blogTranslationRepository.save(translation);
    }

    @Override
    public BlogTranslation findEntityById(UUID id) {
        return findByIdOrThrow(id);
    }

    @Override
    @Transactional
    public void removeEntityById(UUID id) {
        blogTranslationRepository.delete(findByIdOrThrow(id));
    }

    @Override
    @Transactional
    public List<BlogTranslation> removeEntitiesByIds(List<UUID> ids) {
        return deleteByIds(ids);
    }

    @Override
    public void mapRequestToEntity(BlogTranslation entity, BlogTranslationRequest request) {
        setIfNotNull(entity::setLangCode, request.getLangCode());
        setIfNotNull(entity::setSlug, request.getSlug());
        setIfNotNull(entity::setTitle, request.getTitle());
        setIfNotNull(entity::setContent, request.getContent());
        setIfNotNull(entity::setExcerpt, request.getExcerpt());
    }

    @Override
    protected JpaRepository<BlogTranslation, UUID> getRepository() {
        return blogTranslationRepository;
    }

    @Override
    protected String getEntityName() {
        return "BlogTranslation";
    }

    // Additional methods for multi-language support
    public BlogTranslation findByPostIdAndLangCode(UUID postId, String langCode) {
        return blogTranslationRepository.findByPostIdAndLangCode(postId, langCode)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Blog translation for post %s and language %s", postId, langCode), 
                        postId)
                );
    }

    public List<BlogTranslation> findByPostId(UUID postId) {
        return blogTranslationRepository.findByPostId(postId);
    }

    public BlogTranslation findByLangCodeAndSlug(String langCode, String slug) {
        return blogTranslationRepository.findByLangCodeAndSlug(langCode, slug)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Blog translation with slug '%s' and language '%s'", slug, langCode), 
                        slug)
                );
    }

    public List<BlogTranslation> findByLangCode(String langCode) {
        return blogTranslationRepository.findByLangCode(langCode);
    }

    @Transactional
    public BlogTranslation createTranslationForPost(UUID postId, BlogTranslationRequest request) {
        Blog post = blogRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Blog", postId));
        
        // Check if translation already exists
        if (blogTranslationRepository.existsByPostIdAndLangCode(postId, request.getLangCode())) {
            throw new IllegalArgumentException(
                    String.format("Translation for language '%s' already exists for this blog post", 
                            request.getLangCode())
            );
        }
        
        // Check if slug already exists for this language
        if (blogTranslationRepository.existsByLangCodeAndSlug(request.getLangCode(), request.getSlug())) {
            throw new IllegalArgumentException(
                    String.format("Blog translation with slug '%s' already exists for language '%s'", 
                            request.getSlug(), request.getLangCode())
            );
        }
        
        BlogTranslation translation = new BlogTranslation();
        mapRequestToEntity(translation, request);
        translation.setPost(post);
        post.getTranslations().add(translation);
        
        return blogTranslationRepository.save(translation);
    }
}

