package com.example.finance.service;

import com.example.finance.model.BlogPostCategory;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.BlogPostCategoryRepository;
import com.example.finance.schemas.request.BlogPostCategoryRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogPostCategoryService extends BaseService<BlogPostCategory, UUID> implements AService<BlogPostCategory, BlogPostCategoryRequest, UUID> {
    BlogPostCategoryRepository blogPostCategoryRepository;

    @Override
    public List<BlogPostCategory> findAllEntities() {
        return blogPostCategoryRepository.findAll();
    }

    @Override
    public Page<BlogPostCategory> searchEntities(PageableObject pageableObject) {
        return blogPostCategoryRepository.search(pageableObject.getQuery(), pageableObject.toPageRequest());
    }

    @Override
    public BlogPostCategory createEntity(BlogPostCategoryRequest request) {
        BlogPostCategory blogPostCategory = new BlogPostCategory();
        mapRequestToEntity(blogPostCategory, request);
        return blogPostCategoryRepository.save(blogPostCategory);
    }

    @Override
    public BlogPostCategory updateEntityById(UUID uuid, BlogPostCategoryRequest request) {
        BlogPostCategory blogPostCategory = findByIdOrThrow(uuid);
        mapRequestToEntity(blogPostCategory, request);
        return blogPostCategoryRepository.save(blogPostCategory);
    }

    @Override
    public BlogPostCategory findEntityById(UUID uuid) {
        return findByIdOrThrow(uuid);
    }

    @Override
    public void removeEntityById(UUID uuid) {
        blogPostCategoryRepository.delete(findEntityById(uuid));
    }

    @Override
    public List<BlogPostCategory> removeEntitiesByIds(List<UUID> uuids) {
        return List.of();
    }

    @Override
    public void mapRequestToEntity(BlogPostCategory entity, BlogPostCategoryRequest request) {
        setIfNotNull(entity::setName, request.getName());
    }

    @Override
    protected JpaRepository<BlogPostCategory, UUID> getRepository() {
        return blogPostCategoryRepository;
    }

    @Override
    protected String getEntityName() {
        return "BlogPostCategory";
    }
}
