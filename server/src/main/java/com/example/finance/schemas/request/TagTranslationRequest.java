package com.example.finance.schemas.request;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TagTranslationRequest {
    @NotNull(groups = {UpdateMethod.class})
    private UUID id;
    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String langCode;
    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String name;
    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String slug;
}
