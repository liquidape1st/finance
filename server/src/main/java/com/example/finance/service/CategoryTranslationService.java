package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Category;
import com.example.finance.model.CategoryTranslation;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.repository.CategoryTranslationRepository;
import com.example.finance.schemas.request.CategoryTranslationRequest;
import jakarta.validation.constraints.NotNull;
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
public class CategoryTranslationService extends BaseService<CategoryTranslation, UUID> implements AService<CategoryTranslation, CategoryTranslationRequest, UUID> {

    CategoryTranslationRepository categoryTranslationRepository;
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryTranslation> findAllEntities() {
        return categoryTranslationRepository.findAll();
    }

    @Override
    public Page<CategoryTranslation> searchEntities(@NotNull PageableObject pageableObject) {
        // Simple search implementation - can be enhanced with proper query
        return categoryTranslationRepository.findAll(pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public CategoryTranslation createEntity(CategoryTranslationRequest request) {
        // Check if name already exists for this language
        if (categoryTranslationRepository.existsByLangCodeAndName(request.getLangCode(), request.getName())) {
            throw new IllegalArgumentException(
                    String.format("Category translation with name '%s' already exists for language '%s'", 
                            request.getName(), request.getLangCode())
            );
        }

        CategoryTranslation translation = new CategoryTranslation();
        mapRequestToEntity(translation, request);
        
        // If categoryId is provided, link to existing category
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category", request.getCategoryId()));
            
            // Check if translation already exists for this category and language
            if (categoryTranslationRepository.existsByCategoryIdAndLangCode(request.getCategoryId(), request.getLangCode())) {
                throw new IllegalArgumentException(
                        String.format("Translation for language '%s' already exists for this category", 
                                request.getLangCode())
                );
            }
            
            translation.setCategory(category);
            category.getTranslations().add(translation);
        }
        
        return categoryTranslationRepository.save(translation);
    }

    @Override
    @Transactional
    public CategoryTranslation updateEntityById(UUID id, CategoryTranslationRequest request) {
        CategoryTranslation translation = findByIdOrThrow(id);
        
        // Check if name is being changed and if new name already exists
        if (!translation.getName().equals(request.getName()) && 
            categoryTranslationRepository.existsByLangCodeAndName(request.getLangCode(), request.getName())) {
            throw new IllegalArgumentException(
                    String.format("Category translation with name '%s' already exists for language '%s'", 
                            request.getName(), request.getLangCode())
            );
        }
        
        mapRequestToEntity(translation, request);
        return categoryTranslationRepository.save(translation);
    }

    @Override
    public CategoryTranslation findEntityById(UUID id) {
        return findByIdOrThrow(id);
    }

    @Override
    @Transactional
    public void removeEntityById(UUID id) {
        categoryTranslationRepository.delete(findByIdOrThrow(id));
    }

    @Override
    @Transactional
    public List<CategoryTranslation> removeEntitiesByIds(List<UUID> ids) {
        return deleteByIds(ids);
    }

    @Override
    public void mapRequestToEntity(CategoryTranslation entity, CategoryTranslationRequest request) {
        setIfNotNull(entity::setLangCode, request.getLangCode());
        setIfNotNull(entity::setName, request.getName());
    }

    @Override
    protected JpaRepository<CategoryTranslation, UUID> getRepository() {
        return categoryTranslationRepository;
    }

    @Override
    protected String getEntityName() {
        return "CategoryTranslation";
    }

    // Additional methods for multi-language support
    public CategoryTranslation findByCategoryIdAndLangCode(UUID categoryId, String langCode) {
        return categoryTranslationRepository.findByCategoryIdAndLangCode(categoryId, langCode)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Category translation for category %s and language %s", categoryId, langCode), 
                        categoryId)
                );
    }

    public List<CategoryTranslation> findByCategoryId(UUID categoryId) {
        return categoryTranslationRepository.findByCategoryId(categoryId);
    }

    public CategoryTranslation findByLangCodeAndName(String langCode, String name) {
        return categoryTranslationRepository.findByLangCodeAndName(langCode, name)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Category translation with name '%s' and language '%s'", name, langCode), 
                        name)
                );
    }

    public List<CategoryTranslation> findByLangCode(String langCode) {
        return categoryTranslationRepository.findByLangCode(langCode);
    }

    @Transactional
    public CategoryTranslation createTranslationForCategory(UUID categoryId, CategoryTranslationRequest request) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category", categoryId));
        
        // Check if translation already exists
        if (categoryTranslationRepository.existsByCategoryIdAndLangCode(categoryId, request.getLangCode())) {
            throw new IllegalArgumentException(
                    String.format("Translation for language '%s' already exists for this category", 
                            request.getLangCode())
            );
        }
        
        // Check if name already exists for this language
        if (categoryTranslationRepository.existsByLangCodeAndName(request.getLangCode(), request.getName())) {
            throw new IllegalArgumentException(
                    String.format("Category translation with name '%s' already exists for language '%s'", 
                            request.getName(), request.getLangCode())
            );
        }
        
        CategoryTranslation translation = new CategoryTranslation();
        mapRequestToEntity(translation, request);
        translation.setCategory(category);
        category.getTranslations().add(translation);
        
        return categoryTranslationRepository.save(translation);
    }
}

