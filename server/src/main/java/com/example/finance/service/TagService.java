package com.example.finance.service;

import com.example.finance.model.Blog;
import com.example.finance.model.Tag;
import com.example.finance.model.TagTranslation;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.TagRepository;
import com.example.finance.repository.TagTranslationRepository;
import com.example.finance.schemas.request.BlogRequest;
import com.example.finance.schemas.request.TagRequest;
import com.example.finance.schemas.request.TagTranslationRequest;
import com.example.finance.schemas.response.ResponsePayload;
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
public class TagService extends BaseService<Tag, UUID> implements AService<Tag, TagRequest, UUID> {
    TagRepository tagRepository;
    TagTranslationRepository tagTranslationRepository;

    public List<Tag> findAllEntities() {
        return tagRepository.findAll();
    }

    @Override
    public Page<Tag> searchEntities(PageableObject pageableObject) {
        return null;
    }

    @Override
    @Transactional
    public Tag createEntity(TagRequest request) {
        List<TagTranslationRequest> list = request.getTranslationRequests();
        Tag newTag = new Tag();
        for (TagTranslationRequest tagTranslationRequest : list) {
            TagTranslation tagTranslation = new TagTranslation();
            tagTranslation.setLang(tagTranslationRequest.getLang());
            tagTranslation.setSlug(tagTranslationRequest.getSlug());
            tagTranslation.setName(tagTranslationRequest.getName());
            tagTranslation.setTag(newTag);
        }
        return tagRepository.save(newTag);
    }

    @Override
    public Tag updateEntityById(UUID uuid, TagRequest request) {
        List<TagTranslationRequest> list = request.getTranslationRequests();
        Tag newTag = findEntityById(request.getId());
        for (TagTranslationRequest tagTranslationRequest : list) {
            TagTranslation tagTranslation = tagTranslationRepository.findByTagId(tagTranslationRequest.getId()).orElse(new TagTranslation());
            tagTranslation.setLang(tagTranslationRequest.getLang());
            tagTranslation.setSlug(tagTranslationRequest.getSlug());
            tagTranslation.setName(tagTranslationRequest.getName());
            tagTranslation.setTag(newTag);
        }
        return tagRepository.save(newTag);
    }

    @Override
    public Tag findEntityById(UUID id) {
        return findByIdOrThrow(id);
    }

    @Override
    public void removeEntityById(UUID uuid) {

    }

    @Override
    public List<Tag> removeEntitiesByIds(List<UUID> uuids) {
        return List.of();
    }

    @Override
    public void mapRequestToEntity(Tag entity, TagRequest request) {

    }

    @Override
    protected JpaRepository<Tag, UUID> getRepository() {
        return tagRepository;
    }

    @Override
    protected String getEntityName() {
        return "Tag";
    }

}
