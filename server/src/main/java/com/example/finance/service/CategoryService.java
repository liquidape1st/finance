package com.example.finance.service;

import com.example.finance.model.Category;
import com.example.finance.model.CategoryTranslation;
import com.example.finance.model.Tag;
import com.example.finance.model.TagTranslation;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.repository.CategoryTranslationRepository;
import com.example.finance.schemas.request.CategoryRequest;
import com.example.finance.schemas.request.CategoryTranslationRequest;
import com.example.finance.schemas.request.TagRequest;
import com.example.finance.schemas.request.TagTranslationRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService extends BaseService<Category, UUID> implements AService<Category, CategoryRequest, UUID> {
    CategoryRepository categoryRepository;
    CategoryTranslationRepository categoryTranslationRepository;

    public List<Category> findAllEntities() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> searchEntities(PageableObject pageableObject) {
        return categoryRepository.search(pageableObject.getQuery(), pageableObject.toPageRequest());
    }

    @Override
    public Category createEntity(CategoryRequest request) {
        Category newCategory = new Category();
        for (CategoryTranslationRequest categoryTranslationRequest : request.getTranslations()) {
            CategoryTranslation categoryTranslation = new CategoryTranslation();
            mapTagTranslation(newCategory, categoryTranslationRequest, categoryTranslation);
        }
        return categoryRepository.save(newCategory);
    }

    @Override
    public Category updateEntityById(UUID uuid, CategoryRequest request) {
        Category existCategory = findEntityById(request.getId());
        for (CategoryTranslationRequest categoryTranslationRequest : request.getTranslations()) {
            CategoryTranslation categoryTranslation = categoryTranslationRepository.findById(categoryTranslationRequest.getId()).orElse(new CategoryTranslation());
            mapTagTranslation(existCategory, categoryTranslationRequest, categoryTranslation);
            existCategory.getTranslations().add(categoryTranslation);
        }
        return categoryRepository.save(existCategory);
    }

    @Override
    public Category findEntityById(UUID uuid) {
        return findByIdOrThrow(uuid);
    }

    @Override
    public void removeEntityById(UUID uuid) {
        categoryRepository.deleteById(uuid);
    }

    @Override
    public List<Category> removeEntitiesByIds(List<UUID> uuids) {
        return List.of();
    }

    @Override
    public void mapRequestToEntity(Category entity, CategoryRequest request) {

    }

    @Override
    protected JpaRepository<Category, UUID> getRepository() {
        return categoryRepository;
    }

    @Override
    protected String getEntityName() {
        return "Category";
    }

    private void mapTagTranslation(Category category, CategoryTranslationRequest categoryTranslationRequest, CategoryTranslation translation) {
        translation.setLangCode(categoryTranslationRequest.getLangCode());
        translation.setSlug(categoryTranslationRequest.getSlug());
        translation.setName(categoryTranslationRequest.getName());
        translation.setCategory(category);
        category.getTranslations().add(translation);
    }
}
