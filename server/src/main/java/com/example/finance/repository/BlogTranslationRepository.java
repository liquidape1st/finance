package com.example.finance.repository;

import com.example.finance.model.BlogTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogTranslationRepository extends JpaRepository<BlogTranslation, UUID> {
    Optional<BlogTranslation> findByPostIdAndLangCode(UUID postId, String langCode);
    
    List<BlogTranslation> findByPostId(UUID postId);
    
    Optional<BlogTranslation> findByLangCodeAndSlug(String langCode, String slug);
    
    List<BlogTranslation> findByLangCode(String langCode);
    
    boolean existsByLangCodeAndSlug(String langCode, String slug);
    
    boolean existsByPostIdAndLangCode(UUID postId, String langCode);
}
