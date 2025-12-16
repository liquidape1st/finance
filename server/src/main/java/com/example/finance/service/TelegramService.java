package com.example.finance.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class TelegramService {

    RestTemplate restTemplate = new RestTemplate();
    String token = "8318891409:AAHWPjMDY_N3LefmMRJfqIVxhsZzE_8VHfw";

    public void sendMessage(String text) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("chat_id", "-5015559536");
        payload.put("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        String url = "https://api.telegram.org/bot" + token + "/sendMessage";
        String response = restTemplate.postForObject(url, request, String.class);

        System.out.println("Telegram response: " + response);
    }


    public void sendBackupFile(File file, String caption) {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("chat_id", "-5015559536");
        body.add("caption", caption);
        body.add("document", new FileSystemResource(file));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);

        String url = "https://api.telegram.org/bot" + token + "/sendDocument";
        String response = restTemplate.postForObject(url, request, String.class);

        System.out.println("Telegram response: " + response);
    }

}
