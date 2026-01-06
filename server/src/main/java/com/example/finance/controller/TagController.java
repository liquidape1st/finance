package com.example.finance.controller;

import com.example.finance.mapper.TagResponseMapper;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.TagService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TagController  extends BaseController{
    TagService tagService;
    TagResponseMapper mapper;

    public TagController(MessageSource messageSource, TagService tagService, TagResponseMapper mapper) {
        super(messageSource);
        this.tagService = tagService;
        this.mapper = mapper;
    }

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
}
