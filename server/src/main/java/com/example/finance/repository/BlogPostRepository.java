package com.example.finance.repository;

import com.example.finance.model.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
    @Query("SELECT b FROM BlogPost b WHERE " +
            "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(b.content) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<BlogPost> search(@Param("query") String query, Pageable pageable);

    Optional<BlogPost> findBySlug(String slug);
}

