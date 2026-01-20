package com.example.finance.repository;

import com.example.finance.model.TagTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TagTranslationRepository extends JpaRepository<TagTranslation, UUID> {
    @Query("""
                SELECT tt
                FROM TagTranslation tt
                JOIN tt.tag t
                JOIN t.blogs b
                WHERE b.id = :blogId
                  AND tt.langCode = :langCode
            """)
    List<TagTranslation> findByBlogIdAndLangCode(@Param("blogId") UUID blogId, @Param("langCode") String langCode);
}
