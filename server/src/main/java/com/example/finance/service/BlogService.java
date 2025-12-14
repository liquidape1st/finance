package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Blog;
import com.example.finance.model.Category;
import com.example.finance.pageable.PageableObject;
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
        Blog post = new Blog();
        mapRequestToEntity(post, request);
        post.setBlogCategory(findBlogCategoryById(request.getBlogCategoryId()));
        post.setPublishedAt(LocalDateTime.now());
        return blogRepository.save(post);
    }

    @Override
    @Transactional
    public Blog updateEntityById(UUID id, BlogPostRequest request) {
        Blog post = findByIdOrThrow(id);
        mapRequestToEntity(post, request);
        post.setBlogCategory(findBlogCategoryById(request.getBlogCategoryId()));
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
}

