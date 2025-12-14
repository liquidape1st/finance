package com.example.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogTranslationRepository extends JpaRepository<BlogTranslationRepository, UUID> {
}
