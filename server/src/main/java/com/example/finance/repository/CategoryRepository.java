package com.example.finance.repository;

import com.example.finance.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    @Query("""
    SELECT DISTINCT c
    FROM Category c
    JOIN c.translations ct
    WHERE (:query IS NULL OR :query = ''
           OR LOWER(ct.slug) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(ct.name) LIKE LOWER(CONCAT('%', :query, '%')))
    """)
    Page<Category> search(@Param("query") String query, Pageable pageable);
}
