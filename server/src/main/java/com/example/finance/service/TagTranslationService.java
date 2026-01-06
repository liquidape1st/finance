package com.example.finance.service;

import com.example.finance.model.TagTranslation;
import com.example.finance.repository.TagTranslationRepository;
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
public class TagTranslationService extends BaseService<TagTranslation, UUID> {
    TagTranslationRepository tagTranslationRepository;

    public List<TagTranslation> findAllEntities() {
        return tagTranslationRepository.findAll();
    }

    @Override
    protected JpaRepository<TagTranslation, UUID> getRepository() {
        return tagTranslationRepository;
    }

    @Override
    protected String getEntityName() {
        return "Tag";
    }

}
