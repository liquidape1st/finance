package com.example.finance.repository;

import com.example.finance.model.Product;
import com.example.finance.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    List<ProductImage> findByProductOrderByDisplayOrderAsc(Product product);
    
    Optional<ProductImage> findByProductAndIsPrimaryTrue(Product product);
    
    List<ProductImage> findByProduct(Product product);
}

