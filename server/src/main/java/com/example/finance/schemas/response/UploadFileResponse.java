package com.example.finance.schemas.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UploadFileResponse {
    private String key;
    private String presignedUrl;
}
