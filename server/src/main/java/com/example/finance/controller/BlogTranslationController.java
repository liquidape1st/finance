package com.example.finance.controller;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blog-translations")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationController extends BaseController {

    public BlogTranslationController(MessageSource messageSource) {
        super(messageSource);
    }
}

