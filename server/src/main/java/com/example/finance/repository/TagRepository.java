package com.example.finance.repository;

import com.example.finance.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {
    @Query("""
    SELECT DISTINCT t
    FROM Tag t
    JOIN t.translations tt
    WHERE (:query IS NULL OR :query = ''
           OR LOWER(tt.slug) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(tt.name) LIKE LOWER(CONCAT('%', :query, '%')))
    """)
    Page<Tag> search(@Param("query") String query, Pageable pageable);
}
