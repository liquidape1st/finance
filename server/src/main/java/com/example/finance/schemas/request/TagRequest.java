package com.example.finance.schemas.request;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TagRequest {
    @NotNull(groups = {UpdateMethod.class})
    private UUID id;
    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private List<TagTranslationRequest> translations;
}
