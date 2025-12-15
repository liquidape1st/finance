package com.example.finance.controller;

import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.S3Service;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@RestController
@RequestMapping("/api/s3")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class S3Controller extends BaseController {

    S3Service s3Service;

    public S3Controller(MessageSource messageSource, S3Service s3Service) {
        super(messageSource);
        this.s3Service = s3Service;
    }

    @PostMapping("/upload")
    public ResponseEntity<ResponsePayload> uploadFile(@RequestParam("file") MultipartFile file) {
        return createResponse(
                s3Service.uploadFile(file),
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<ResponsePayload> listFiles() {
        return createResponse(
                s3Service.listFiles(),
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping("/download")
    public ResponseEntity<ResponsePayload> downloadFile(@RequestParam("fileName") String fileName) {
        return createResponse(
                s3Service.getFileUrl(fileName),
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping("/sign")
    public ResponseEntity<ResponsePayload> signFile(@RequestParam("fileName") String fileName) {
        return createResponse(
                s3Service.generatePresignedUrl(fileName),
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping("/stream")
    public ResponseEntity<?> getStream(@RequestParam("fileName") String fileName) {
        ResponseInputStream<GetObjectResponse> s3Stream = s3Service.getStream(fileName);

        GetObjectResponse meta = s3Stream.response();

        MediaType mediaType = meta.contentType() != null
                ? MediaType.parseMediaType(meta.contentType())
                : MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + fileName + "\"")
                .contentType(mediaType)
                .contentLength(meta.contentLength())
                .body(new InputStreamResource(s3Stream));
    }

    @DeleteMapping
    public ResponseEntity<ResponsePayload> deleteFile(@RequestParam("fileName") String fileName) {
        s3Service.deleteFile(fileName);
        return createResponse(
                null,
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }
}