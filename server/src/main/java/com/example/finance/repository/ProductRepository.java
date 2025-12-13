package com.example.finance.repository;

import com.example.finance.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> search(@Param("query") String query);

    @Query("""
            SELECT p FROM Product p
            WHERE
                (
                    LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))
                )
                AND (
                    :category IS NULL OR p.category.name ILIKE :category
                )
            """)
    Page<Product> search(@Param("query") String query, @Param("category") String category, Pageable pageable);

    Optional<Product> findByCode(String productCode);
    Optional<Product> findBySlug(String slug);
}

