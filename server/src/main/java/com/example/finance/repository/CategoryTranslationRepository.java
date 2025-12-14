package com.example.finance.repository;

import com.example.finance.model.CategoryTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryTranslationRepository extends JpaRepository<CategoryTranslation, UUID> {
    Optional<CategoryTranslation> findByCategoryIdAndLangCode(UUID categoryId, String langCode);
    
    List<CategoryTranslation> findByCategoryId(UUID categoryId);
    
    Optional<CategoryTranslation> findByLangCodeAndName(String langCode, String name);
    
    List<CategoryTranslation> findByLangCode(String langCode);
    
    boolean existsByLangCodeAndName(String langCode, String name);
    
    boolean existsByCategoryIdAndLangCode(UUID categoryId, String langCode);
}
