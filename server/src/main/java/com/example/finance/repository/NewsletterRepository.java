package com.example.finance.repository;

import com.example.finance.model.Newsletter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, UUID> {
    Optional<Newsletter> findByEmail(String email);
    boolean existsByEmail(String email);
}

