package com.example.finance.service;

import com.example.finance.model.Category;
import com.example.finance.model.CategoryTranslation;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.repository.CategoryTranslationRepository;
import com.example.finance.schemas.request.BlogPostCategoryRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService extends BaseService<Category, UUID> implements AService<Category, BlogPostCategoryRequest, UUID> {
    CategoryRepository categoryRepository;
    CategoryTranslationRepository categoryTranslationRepository;

    @Override
    public List<Category> findAllEntities() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> searchEntities(PageableObject pageableObject) {
        return categoryRepository.search(pageableObject.getQuery(), pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public Category createEntity(BlogPostCategoryRequest request) {
        // Check if name already exists for this language
        if (categoryTranslationRepository.existsByLangCodeAndName(request.getLangCode(), request.getName())) {
            throw new IllegalArgumentException(
                    String.format("Category translation with name '%s' already exists for language '%s'", 
                            request.getName(), request.getLangCode())
            );
        }

        Category category = new Category();
        mapRequestToEntity(category, request);
        
        // Create translation for the category
        CategoryTranslation translation = new CategoryTranslation();
        translation.setLangCode(request.getLangCode());
        translation.setName(request.getName());
        translation.setCategory(category);
        category.getTranslations().add(translation);
        
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Category updateEntityById(UUID uuid, BlogPostCategoryRequest request) {
        Category category = findByIdOrThrow(uuid);
        mapRequestToEntity(category, request);
        
        // Update or create translation for the specified language
        CategoryTranslation translation = categoryTranslationRepository
                .findByCategoryIdAndLangCode(uuid, request.getLangCode())
                .orElse(null);
        
        if (translation == null) {
            // Create new translation if it doesn't exist
            if (categoryTranslationRepository.existsByLangCodeAndName(request.getLangCode(), request.getName())) {
                throw new IllegalArgumentException(
                        String.format("Category translation with name '%s' already exists for language '%s'", 
                                request.getName(), request.getLangCode())
                );
            }
            translation = new CategoryTranslation();
            translation.setCategory(category);
            category.getTranslations().add(translation);
        } else {
            // Check if name is being changed and if new name already exists
            if (!translation.getName().equals(request.getName()) && 
                categoryTranslationRepository.existsByLangCodeAndName(request.getLangCode(), request.getName())) {
                throw new IllegalArgumentException(
                        String.format("Category translation with name '%s' already exists for language '%s'", 
                                request.getName(), request.getLangCode())
                );
            }
        }
        
        translation.setLangCode(request.getLangCode());
        translation.setName(request.getName());
        
        return categoryRepository.save(category);
    }

    @Override
    public Category findEntityById(UUID uuid) {
        return findByIdOrThrow(uuid);
    }

    @Override
    @Transactional
    public void removeEntityById(UUID uuid) {
        categoryRepository.delete(findEntityById(uuid));
    }

    @Override
    public List<Category> removeEntitiesByIds(List<UUID> uuids) {
        return List.of();
    }

    @Override
    public void mapRequestToEntity(Category entity, BlogPostCategoryRequest request) {
    }

    @Override
    protected JpaRepository<Category, UUID> getRepository() {
        return categoryRepository;
    }

    @Override
    protected String getEntityName() {
        return "BlogPostCategory";
    }

    // Additional methods for multi-language support
    public CategoryTranslation findTranslationByCategoryIdAndLangCode(UUID categoryId, String langCode) {
        return categoryTranslationRepository.findByCategoryIdAndLangCode(categoryId, langCode)
                .orElseThrow(() -> new com.example.finance.exception.EntityNotFoundException(
                        String.format("Category translation for category %s and language %s", categoryId, langCode), 
                        categoryId)
                );
    }

    public List<CategoryTranslation> findTranslationsByCategoryId(UUID categoryId) {
        return categoryTranslationRepository.findByCategoryId(categoryId);
    }

    public CategoryTranslation findTranslationByLangCodeAndName(String langCode, String name) {
        return categoryTranslationRepository.findByLangCodeAndName(langCode, name)
                .orElseThrow(() -> new com.example.finance.exception.EntityNotFoundException(
                        String.format("Category translation with name '%s' and language '%s'", name, langCode), 
                        name)
                );
    }

    public List<Category> findByLangCode(String langCode) {
        return categoryTranslationRepository.findByLangCode(langCode)
                .stream()
                .map(CategoryTranslation::getCategory)
                .distinct()
                .toList();
    }
}
