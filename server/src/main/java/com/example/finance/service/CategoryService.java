package com.example.finance.service;

import com.example.finance.model.Category;
import com.example.finance.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService extends BaseService<Category, UUID> {
    CategoryRepository categoryRepository;

    public List<Category> findAllEntities() {
        return categoryRepository.findAll();
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
