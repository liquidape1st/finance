package com.example.finance.repository;

import com.example.finance.model.Blog;
import com.example.finance.model.CategoryTranslation;
import com.example.finance.schemas.response.CategoryTranslationClientResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryTranslationRepository extends JpaRepository<CategoryTranslation, UUID> {
    @Query(
            """
                    SELECT new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                       ct.id,
                       ct.langCode,
                       ct.name,
                       c.id
                       )
                       FROM CategoryTranslation ct
                       JOIN Category c ON c.id = ct.category.id
                       WHERE ct.langCode = :languageCode
                    """
    )
    List<CategoryTranslationClientResponse> findAllCategoryTranslationByLanguageCode(@Param("languageCode") String languageCode);


    @Query(
            """
                    SELECT DISTINCT new com.example.finance.schemas.response.CategoryTranslationClientResponse(
                       ct.id,
                       ct.langCode,
                       ct.name,
                       c.id
                       )
                       FROM CategoryTranslation ct
                       JOIN Category c ON c.id = ct.category.id
                       JOIN Blog b on b.category.id = c.id
                       WHERE ct.langCode = :languageCode
                       AND b.uiType = :uiType
                    """
    )
    List<CategoryTranslationClientResponse> findAllCategoryTranslationByLanguageCodeAndUiType(@Param("languageCode") String languageCode, @Param("uiType") Blog.UiType uiType);
}
