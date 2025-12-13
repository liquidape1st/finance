package com.example.finance.service;

import com.example.finance.exception.BusinessException;
import com.example.finance.exception.EntityAlreadyExistsException;
import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Category;
import com.example.finance.model.Product;
import com.example.finance.model.ProductImage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.repository.ProductRepository;
import com.example.finance.schemas.request.ProductRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService extends BaseService<Product, String> implements AService<Product, ProductRequest, String> {

    ProductRepository productRepository;
    CategoryRepository categoryRepository;

    @Override
    public List<Product> findAllEntities() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> searchEntities(@NotNull PageableObject pageableObject) {
        return productRepository.search(pageableObject.getQuery(), null, pageableObject.toPageRequest());
    }

    public Page<Product> searchEntities(@NotNull PageableObject pageableObject, String category) {
        return productRepository.search(pageableObject.getQuery(), category, pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public Product createEntity(ProductRequest request) {
        validateCode(request.getCode());
        Category category = findCategoryById(request.getCategoryId());
        Product product = new Product();
        mapRequestToEntity(product, request);
        product.setCategory(category);
        product.setSoldCount(0);

        Product savedProduct = productRepository.save(product);
        saveProductImagesIfPresent(savedProduct, request.getImages());
        return savedProduct;
    }


    @Override
    @Transactional
    public Product updateEntityById(String code, ProductRequest request) {
        Product product = findByIdOrThrow(code);
        product.setCategory(findCategoryById(request.getCategoryId()));
        mapRequestToEntity(product, request);

        Product savedProduct = productRepository.save(product);
        saveProductImagesIfPresent(savedProduct, request.getImages());
        return savedProduct;
    }

    @Override
    public Product findEntityById(String code) {
        return findByIdOrThrow(code);
    }

    public Product findEntityBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName(), slug));
    }

    @Override
    @Transactional
    public void removeEntityById(String code) {
        productRepository.delete(findByIdOrThrow(code));
    }

    @Override
    @Transactional
    public List<Product> removeEntitiesByIds(List<String> codes) {
        return deleteByIds(codes);
    }

    @Override
    public void mapRequestToEntity(Product entity, ProductRequest request) {
        setIfNotNull(entity::setCode, request.getCode());
        setIfNotNull(entity::setName, request.getName());
        setIfNotNull(entity::setPrice, request.getPrice());
        setIfNotNull(entity::setSlug, request.getSlug());
        setIfNotNull(entity::setExcerpt, request.getExcerpt());
        setIfNotNull(entity::setDescription, request.getDescription());
        entity.setStock(request.getStock() != null ? request.getStock() : (entity.getStock() != null ? entity.getStock() : 0));
        entity.setRating(request.getRating() != null ? request.getRating() : (entity.getRating() != null ? entity.getRating() : 0.0));
    }

    @Override
    protected JpaRepository<Product, String> getRepository() {
        return productRepository;
    }

    @Override
    protected String getEntityName() {
        return "Product";
    }


    private Category findCategoryById(java.util.UUID categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Category", categoryId));
    }

    private void validateCode(String code) {
        if (code.length() > 6) {
            throw new BusinessException("Product code must be 6 characters or less");
        }
        if (productRepository.existsById(code)) {
            throw new EntityAlreadyExistsException("Product code already exists: " + code);
        }
    }

    private void saveProductImagesIfPresent(Product product, List<ProductRequest.ProductImageRequest> imageRequests) {
        if (imageRequests == null || imageRequests.isEmpty()) {
            return;
        }
        product.getImages().clear();
        boolean hasPrimary = false;
        int order = 0;

        for (ProductRequest.ProductImageRequest imageRequest : imageRequests) {
            ProductImage productImage = createProductImage(product, imageRequest, order, hasPrimary);
            if (productImage.getIsPrimary()) {
                hasPrimary = true;
            }
            product.getImages().add(productImage);
            order++;
        }

        if (!hasPrimary && !product.getImages().isEmpty()) {
            product.getImages().get(0).setIsPrimary(true);
        }
    }

    private ProductImage createProductImage(Product product, ProductRequest.ProductImageRequest request, int defaultOrder, boolean hasPrimary) {
        ProductImage image = new ProductImage();
        image.setProduct(product);
        image.setFilename(request.getFilename());
        image.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : defaultOrder);
        image.setIsPrimary(request.getIsPrimary() != null && request.getIsPrimary() && !hasPrimary);
        return image;
    }
}

