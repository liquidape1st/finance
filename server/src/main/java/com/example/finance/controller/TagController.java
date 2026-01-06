package com.example.finance.controller;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import com.example.finance.mapper.TagResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.TagRequest;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.schemas.response.TagResponse;
import com.example.finance.service.TagService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tags")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TagController extends BaseController implements AController<TagRequest, UUID, PageableObject> {
    TagService tagService;
    TagResponseMapper mapper;

    public TagController(MessageSource messageSource, TagService tagService, TagResponseMapper mapper) {
        super(messageSource);
        this.tagService = tagService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    @PreAuthorize("hasAuthority('TAG:READ')")
    public ResponseEntity<ResponsePayload> search(PageableObject pageableObject) {
        CustomPage<TagResponse> result = new CustomPage<>(tagService.searchEntities(pageableObject).map(mapper::toDTO));
        return createResponse(
                result,
                "tag.search.success.title",
                "tag.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    @PreAuthorize("hasAuthority('TAG:READ')")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                tagService.findAllEntities().stream().map(mapper::toDTO),
                "tag.search.success.title",
                "tag.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('TAG:CREATE')")
    public ResponseEntity<ResponsePayload> create(@Validated(CreateMethod.class) @RequestBody TagRequest request) {
        return createResponse(
                mapper.toDTO(tagService.createEntity(request)),
                "tag.create.success.title",
                "tag.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    @PreAuthorize("hasAuthority('TAG:UPDATE')")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Validated(UpdateMethod.class) @RequestBody TagRequest request) {
        return createResponse(
                mapper.toDTO(tagService.updateEntityById(uuid, request)),
                "tag.update.success.title",
                "tag.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    @PreAuthorize("hasAuthority('TAG:READ')")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(tagService.findEntityById(uuid)),
                "blog.get.success.title",
                "blog.get.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    @PreAuthorize("hasAuthority('TAG:DELETE')")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        tagService.removeEntityById(uuid);
        return createResponse(
                null,
                "tag.delete.success.title",
                "tag.delete.success.detail",
                HttpStatus.OK
        );
    }
}
