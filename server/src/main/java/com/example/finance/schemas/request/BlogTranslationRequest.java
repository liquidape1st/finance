package com.example.finance.schemas.request;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTranslationRequest {
    private UUID id;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String langCode;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String slug;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String title;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String content;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String excerpt;
}

