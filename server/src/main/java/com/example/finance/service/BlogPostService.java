package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.BlogPost;
import com.example.finance.model.BlogPostCategory;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.BlogPostCategoryRepository;
import com.example.finance.repository.BlogPostRepository;
import com.example.finance.schemas.request.BlogPostRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogPostService extends BaseService<BlogPost, UUID> implements AService<BlogPost, BlogPostRequest, UUID> {

    BlogPostRepository blogPostRepository;
    BlogPostCategoryRepository blogPostCategoryRepository;

    @Override
    public List<BlogPost> findAllEntities() {
        return blogPostRepository.findAll();
    }

    @Override
    public Page<BlogPost> searchEntities(@NotNull PageableObject pageableObject) {
        return blogPostRepository.search(pageableObject.getQuery(), pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public BlogPost createEntity(BlogPostRequest request) {
        BlogPost post = new BlogPost();
        mapRequestToEntity(post, request);
        post.setBlogCategory(findBlogCategoryById(request.getBlogCategoryId()));
        post.setSlug(generateSlug(request.getTitle()));
        post.setPublishedAt(LocalDateTime.now());
        return blogPostRepository.save(post);
    }

    @Override
    @Transactional
    public BlogPost updateEntityById(UUID id, BlogPostRequest request) {
        BlogPost post = findByIdOrThrow(id);
        mapRequestToEntity(post, request);
        post.setBlogCategory(findBlogCategoryById(request.getBlogCategoryId()));
        post.setSlug(generateSlug(request.getTitle()));
        return blogPostRepository.save(post);
    }

    @Override
    public BlogPost findEntityById(UUID id) {
        return findByIdOrThrow(id);
    }

    public BlogPost findEntityBySlug(String slug) {
        return blogPostRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName(), slug));
    }

    @Override
    @Transactional
    public void removeEntityById(UUID id) {
        blogPostRepository.delete(findByIdOrThrow(id));
    }

    @Override
    @Transactional
    public List<BlogPost> removeEntitiesByIds(List<UUID> ids) {
        return deleteByIds(ids);
    }

    @Override
    public void mapRequestToEntity(BlogPost entity, BlogPostRequest request) {
        setIfNotNull(entity::setTitle, request.getTitle());
        setIfNotNull(entity::setContent, request.getContent());
        setIfNotNull(entity::setExcerpt, request.getExcerpt());
        setIfNotNull(entity::setImage, request.getImage());
        setIfNotNull(entity::setAuthor, request.getAuthor());
        setIfNotNull(entity::setEstimatedReadTime, request.getEstimatedReadTime());
    }

    @Override
    protected JpaRepository<BlogPost, UUID> getRepository() {
        return blogPostRepository;
    }

    @Override
    protected String getEntityName() {
        return "BlogPost";
    }

    private BlogPostCategory findBlogCategoryById(java.util.UUID blogCategoryId) {
        return blogPostCategoryRepository.findById(blogCategoryId).orElseThrow(() -> new EntityNotFoundException("Blog category", blogCategoryId));
    }

    private String generateSlug(String title) {
        // Bước 1: Chuẩn hóa Unicode về dạng decomposed (vd: "ấ" → "a" + "̂")
        String normalized = Normalizer.normalize(title, Normalizer.Form.NFD);

        // Bước 2: Xóa toàn bộ dấu (combining marks)
        String withoutAccents = normalized.replaceAll("\\p{M}", "");

        // Bước 3: Convert dạng tiếng Việt đặc biệt như Đ, đ
        withoutAccents = withoutAccents.replace("Đ", "D").replace("đ", "d");

        // Bước 4: Slugify như trước
        return withoutAccents.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
    }
}

