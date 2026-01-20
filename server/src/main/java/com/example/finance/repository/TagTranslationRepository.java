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
                SELECT DISTINCT tt
                FROM Blog b
                JOIN b.tags t
                JOIN t.translations tt
                WHERE b.id = :blogId
                  AND UPPER(tt.langCode) = UPPER(:langCode)
            """)
    List<TagTranslation> findByBlogIdAndLangCode(@Param("blogId") UUID blogId, @Param("langCode") String langCode);
}
