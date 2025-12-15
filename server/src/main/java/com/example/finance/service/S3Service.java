package com.example.finance.service;


import com.example.finance.schemas.response.UploadFileResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class S3Service {
    private static final Logger logger = LoggerFactory.getLogger(S3Service.class);
    private final S3Client s3Client;
    private final String bucketName = "s3s-bucket-aisuui";
    private final String folderName = "finance";
    private final S3Presigner s3Presigner; // Yêu cầu S3Presigner bean phải được cấu hình

    public UploadFileResponse uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();

            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                originalFileName = "file";
            }

            // Lấy phần mở rộng
            String extension = "";
            int dotIndex = originalFileName.lastIndexOf('.');
            if (dotIndex >= 0) {
                extension = originalFileName.substring(dotIndex);
            }

            // Tạo UUID mới
            String newFileName = UUID.randomUUID() + extension;

            // Nối folder
            String key = folderName + "/" + newFileName;
            logger.info("Uploading file to folder: {}", key);
            logger.info("Uploading file: {}", fileName);
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build(),
                    software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes()));
            logger.info("File uploaded successfully: {}", fileName);
            String presignedUrl = generatePresignedUrl(key);
            return UploadFileResponse.builder().key(key).presignedUrl(presignedUrl).build();
        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    public String generatePresignedUrl(String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        // 2. Tạo request ký trước (presign request)
        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .getObjectRequest(getObjectRequest)
                // Đặt thời gian hết hạn
                .signatureDuration(Duration.ofMinutes(15))
                .build();

        // 3. Tạo URL đã ký trước
        PresignedGetObjectRequest presignedObjectRequest = s3Presigner.presignGetObject(presignRequest);

        return presignedObjectRequest.url().toString();
    }

    public List<Object> listFiles() {
        logger.info("Fetching file list from bucket: {}", bucketName);
        ListObjectsV2Response listObjects = s3Client.listObjectsV2(ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(folderName)
                .build());
        List<Object> fileList = listObjects.contents().stream()
                .map(S3Object::key)
                .collect(Collectors.toList());
        logger.info("Files retrieved: {}", fileList);
        return fileList;
    }

    public String getFileUrl(String fileName) {
        logger.info("Generating URL for file: {}", fileName);
        String url = s3Client.utilities().getUrl(GetUrlRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build()).toString();
        logger.info("Generated URL: {}", url);
        return url;
    }

    public ResponseInputStream<GetObjectResponse> getStream(String fileName) {
        return s3Client.getObject(
                GetObjectRequest.builder()
                        .bucket(bucketName)
                        .key(fileName)
                        .build()
        );
    }

    public void deleteFile(String fileName) {
        logger.info("Deleting file: {} from bucket: {}", fileName, bucketName);
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build());
        logger.info("File deleted successfully: {}", fileName);
    }
}