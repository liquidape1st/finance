package com.example.finance.service;

import com.example.finance.exception.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public abstract class BaseService<E, ID> {
    
    protected abstract JpaRepository<E, ID> getRepository();
    protected abstract String getEntityName();
    
    protected E findByIdOrThrow(ID id) {
        return getRepository().findById(id)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName(), id));
    }
    
    protected List<E> deleteByIds(List<ID> ids) {
        List<E> deletedEntities = new ArrayList<>();
        for (ID id : ids) {
            E entity = findByIdOrThrow(id);
            deletedEntities.add(entity);
            getRepository().delete(entity);
        }
        return deletedEntities;
    }

    protected <T> void setIfNotNull(java.util.function.Consumer<T> setter, T value) {
        if (value != null) {
            setter.accept(value);
        }
    }
}

