package com.example.finance.repository;

import com.example.finance.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query("SELECT o FROM Order o WHERE LOWER(o.code) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Order> search(@Param("query") String query, Pageable pageable);

    @Query("""
            SELECT o
            FROM Order o
            WHERE (
                        LOWER(o.code) LIKE LOWER(CONCAT('%', :query, '%'))
                        OR LOWER(o.customerName) LIKE LOWER(CONCAT('%', :query, '%'))
                        OR LOWER(o.customerEmail) LIKE LOWER(CONCAT('%', :query, '%'))
                        OR LOWER(o.customerPhone) LIKE LOWER(CONCAT('%', :query, '%'))
                  )
                  AND (
                      :status IS NULL OR LOWER(CAST(o.status AS string)) ILIKE :status
                  )
            """)
    Page<Order> search(
            @Param("query") String query,
            @Param("status") String status,
            Pageable pageable
    );
}

