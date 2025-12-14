package com.example.finance.repository;

import com.example.finance.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogRepository extends JpaRepository<Blog, UUID> {
    @Query("SELECT b FROM Blog b")
    Page<Blog> search(@Param("query") String query, Pageable pageable);
}

