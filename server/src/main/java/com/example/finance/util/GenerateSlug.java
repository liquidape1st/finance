package com.example.finance.util;

import java.text.Normalizer;

public class GenerateSlug {
    public static String generateSlug(String title) {
        // Bước 1: Chuẩn hóa Unicode về dạng decomposed (vd: "ấ" → "a" + "̂")
        String normalized = Normalizer.normalize(title, Normalizer.Form.NFD);

        // Bước 2: Xóa toàn bộ dấu (combining marks)
        String withoutAccents = normalized.replaceAll("\\p{M}", "");

        // Bước 3: Convert dạng tiếng Việt đặc biệt như Đ, đ
        withoutAccents = withoutAccents.replace("Đ", "D").replace("đ", "d");

        // Bước 4: Slugify như trước
        return withoutAccents.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
    }
}
