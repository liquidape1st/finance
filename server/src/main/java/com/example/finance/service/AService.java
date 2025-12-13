package com.example.finance.service;

import com.example.finance.pageable.PageableObject;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AService<E, R, ID> {

    List<E> findAllEntities();

    Page<E> searchEntities(PageableObject pageableObject);

    E createEntity(R request);

    E updateEntityById(ID id, R request);

    E findEntityById(ID id);

    void removeEntityById(ID id);

    List<E> removeEntitiesByIds(List<ID> ids);

    void mapRequestToEntity(E entity, R request);
}