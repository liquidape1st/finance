package com.example.finance.repository;

import com.example.finance.model.BlogTranslation;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogTranslationRepository extends JpaRepository<BlogTranslation, UUID> {
    @Query("""
                SELECT new com.example.finance.schemas.response.BlogTranslationClientResponse(
                    bt.id,
                    bt.langCode,
                    bt.slug,
                    bt.title,
                    bt.content,
                    bt.excerpt,
                    b.view,
                    b.image,
                    b.author,
                    b.featured,
                    b.estimatedReadTime,
                    new com.example.finance.schemas.response.CategoryClientResponse(
                        c.id,
                        ct.name
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
            """)
    Page<BlogTranslationClientResponse> findPageBlogTranslation(@Param("langCode") String langCode, Pageable pageable);
}
