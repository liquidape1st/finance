package com.example.finance.repository;

import com.example.finance.model.TagTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TagTranslationRepository extends JpaRepository<TagTranslation, UUID> {
}
