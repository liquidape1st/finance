package com.example.finance.controller;

import com.example.finance.schemas.request.NewsletterRequest;
import com.example.finance.model.Newsletter;
import com.example.finance.repository.NewsletterRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
public class NewsletterController {

    private final NewsletterRepository newsletterRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribe(@Valid @RequestBody NewsletterRequest request) {
        if (newsletterRepository.existsByEmail(request.getEmail())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email này đã được đăng ký rồi!");
            response.put("status", "already_subscribed");
            return ResponseEntity.ok(response);
        }

        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(request.getEmail());
        newsletterRepository.save(newsletter);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Đăng ký nhận tin thành công!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}

