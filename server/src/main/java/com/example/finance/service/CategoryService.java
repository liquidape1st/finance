package com.example.finance.service;

import com.example.finance.model.Category;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.schemas.request.CategoryRequest;
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
public class CategoryService extends BaseService<Category, UUID> implements AService<Category, CategoryRequest, UUID> {

    CategoryRepository categoryRepository;

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
    public Category createEntity(CategoryRequest request) {
        Category category = new Category();
        mapRequestToEntity(category, request);
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Category updateEntityById(UUID uuid, CategoryRequest request) {
        Category category = findByIdOrThrow(uuid);
        mapRequestToEntity(category, request);
        return categoryRepository.save(category);
    }

    @Override
    public Category findEntityById(UUID uuid) {
        return findByIdOrThrow(uuid);
    }

    @Override
    @Transactional
    public void removeEntityById(UUID uuid) {
        categoryRepository.delete(findByIdOrThrow(uuid));
    }

    @Override
    @Transactional
    public List<Category> removeEntitiesByIds(List<UUID> uuids) {
        return deleteByIds(uuids);
    }


    @Override
    public void mapRequestToEntity(Category entity, CategoryRequest request) {
        setIfNotNull(entity::setName, request.getName());
    }

    @Override
    protected JpaRepository<Category, UUID> getRepository() {
        return categoryRepository;
    }

    @Override
    protected String getEntityName() {
        return "Category";
    }
}
