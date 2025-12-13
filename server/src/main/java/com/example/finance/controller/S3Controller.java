package com.example.finance.controller;

import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.S3Service;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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