package com.example.finance.repository;

import com.example.finance.model.Blog;
import com.example.finance.model.BlogTranslation;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BlogTranslationRepository extends JpaRepository<BlogTranslation, UUID> {
    List<BlogTranslation>  findAllByBlog_Id(UUID id);
    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.id,
                    b.uiType,
                    b.contentType,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                        ct.id,
                        ct.langCode,
                        ct.name,
                        c.id
                    ),
                    bt.createdAt,
                    bt.updatedAt
                )
                FROM BlogTranslation bt
                JOIN bt.blog b
                JOIN b.category c
                JOIN c.translations ct
                WHERE bt.langCode = :langCode
                AND ct.langCode = :langCode
                AND (
                   :#{#uiType} IS NULL OR b.uiType = :#{#uiType}
                )
                AND (
                    :category IS NULL OR b.category.id = :category
                )
                AND (
                    LOWER(bt.title) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(bt.excerpt) LIKE LOWER(CONCAT('%', :query, '%'))
                ) AND b.enabled = true
            """)
    Page<BlogTranslationClientResponse> findPageBlogTranslation(@Param("query") String query, @Param("langCode") String langCode, @Param("category") UUID category, @Param("uiType") Blog.UiType uiType, Pageable pageable);


    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.id,
                    b.uiType,
                    b.contentType,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                        ct.id,
                        ct.langCode,
                        ct.name,
                        c.id
                    ),
                    bt.createdAt,
                    bt.updatedAt
                )
                FROM BlogTranslation bt
                JOIN bt.blog b
                JOIN b.category c
                JOIN c.translations ct
                WHERE bt.langCode = :langCode
                AND ct.langCode = :langCode
                AND bt.slug = :slug
                AND b.enabled = true
            """)
    BlogTranslationClientResponse findBlogTranslationByLangCodeAndSlug(@Param("slug") String slug, @Param("langCode") String langCode);


    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.id,
                    b.uiType,
                    b.contentType,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                        ct.id,
                        ct.langCode,
                        ct.name,
                        c.id
                    ),
                    bt.createdAt,
                    bt.updatedAt
                )
                FROM BlogTranslation bt
                JOIN bt.blog b
                JOIN b.category c
                JOIN c.translations ct
                WHERE bt.langCode = :langCode
                AND ct.langCode = :langCode
                AND (
                    :category IS NULL OR b.category.id = :category
                )
                AND b.enabled = true
                AND b.featured = true
            """)
    List<BlogTranslationClientResponse> findFeaturedBlogList(@Param("langCode") String langCode, @Param("category") UUID category);


    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.id,
                    b.uiType,
                    b.contentType,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                        ct.id,
                        ct.langCode,
                        ct.name,
                        c.id
                    ),
                    bt.createdAt, bt.updatedAt
                )
                FROM BlogTranslation bt
                JOIN bt.blog b
                JOIN b.category c
                JOIN c.translations ct
                WHERE bt.langCode = :langCode
                  AND ct.langCode = :langCode
                  AND c.id = :category
                  AND b.featured = false
                  AND b.enabled = true
            """)
    List<BlogTranslationClientResponse> findNonFeaturedSameCategory(String langCode, UUID category);

    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.id,
                    b.uiType,
                    b.contentType,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                        ct.id,
                        ct.langCode,
                        ct.name, c.id
                    ),
                    bt.createdAt, bt.updatedAt
                )
                FROM BlogTranslation bt
                JOIN bt.blog b
                JOIN b.category c
                JOIN c.translations ct
                WHERE bt.langCode = :langCode
                  AND ct.langCode = :langCode
                  AND (:category IS NULL OR c.id <> :category)
                  AND b.featured = false
                  AND b.enabled = true
            """)
    List<BlogTranslationClientResponse> findNonFeaturedOtherCategory(String langCode, UUID category);

    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.id,
                    b.uiType,
                    b.contentType,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                        ct.id,
                        ct.langCode,
                        ct.name, c.id
                    ),
                    bt.createdAt, bt.updatedAt
                )
                FROM BlogTranslation bt
                JOIN bt.blog b
                JOIN b.category c
                JOIN c.translations ct
                WHERE bt.langCode = :langCode
                  AND ct.langCode = :langCode
                  AND (:category IS NULL OR c.id = :category)
                  AND b.featured = false
                  AND b.enabled = true
                  AND (
                    :#{#contentType} IS NULL OR b.contentType = :#{#contentType}
                  )
                  AND (
                    :#{#uiType} IS NULL OR b.uiType = :#{#uiType}
                  )
            """)
    List<BlogTranslationClientResponse> findListRelatedBlogTranslationByCategoryAndUiTypeAndContentTypeAndLangCode(String langCode, UUID category, Blog.ContentType contentType, Blog.UiType uiType);

}
