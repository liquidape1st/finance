package com.example.finance.controller;

import com.example.finance.schemas.request.ContactRequest;
import com.example.finance.service.TelegramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final TelegramService telegramService;

    @PostMapping
    public ResponseEntity<Map<String, String>> sendContact(@Valid @RequestBody ContactRequest request) {
        // TODO: Implement email service to send contact form
        // For now, just return success message

        Map<String, String> response = new HashMap<>();
        response.put("message", "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
        response.put("status", "success");

        // Log contact request (in production, save to database)
        System.out.println("Contact form submitted:");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Phone: " + request.getPhone());
        System.out.println("Subject: " + request.getSubject());
        System.out.println("Message: " + request.getMessage());

        String text = """
                📩 *NHẬN ĐƯỢC MẪU LIÊN HỆ*
                ───────────────────────
                👤 *Tên liên hệ:* %s
                📧 *Email:* %s
                📱 *Số điện thoại:* %s
                🏷️ *Chủ đề:* %s
                
                💬 *Tin nhắn:*
                %s
                """.formatted(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getSubject(),
                request.getMessage()
        );
        telegramService.sendMessage(text);
        return ResponseEntity.ok(response);
    }
}

