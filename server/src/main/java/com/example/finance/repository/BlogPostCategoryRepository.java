package com.example.finance.repository;

import com.example.finance.model.BlogPostCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogPostCategoryRepository extends JpaRepository<BlogPostCategory, UUID> {
    @Query("SELECT b FROM BlogPostCategory b WHERE LOWER(b.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<BlogPostCategory> search(@Param("query") String query, Pageable pageable);

}
