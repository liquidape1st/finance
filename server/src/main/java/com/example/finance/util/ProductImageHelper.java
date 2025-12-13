package com.example.finance.util;

import com.example.finance.model.Product;
import com.example.finance.model.ProductImage;
import com.example.finance.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductImageHelper {
    
    private final ProductImageRepository productImageRepository;
    
    public String getPrimaryImageUrl(Product product) {
        return productImageRepository.findByProductAndIsPrimaryTrue(product)
                .map(ProductImage::getFilename)
                .orElseGet(() -> getFirstImageUrl(product));
    }
    
    public String getFirstImageUrl(Product product) {
        List<ProductImage> images = productImageRepository.findByProductOrderByDisplayOrderAsc(product);
        return images.isEmpty() ? null : images.get(0).getFilename();
    }
}

