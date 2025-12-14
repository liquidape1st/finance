package com.example.finance.model;

import com.example.finance.converter.EpochToLocalDateTimeDeserializer;
import com.example.finance.converter.LocalDateTimeConverter;
import com.example.finance.converter.LocalDateTimeToEpochSerializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "blog_translations",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"post_id", "lang_code"}),
                @UniqueConstraint(columnNames = {"lang_code", "slug"})
        },
        indexes = {
                @Index(name = "idx_translation_lang", columnList = "lang_code"),
                @Index(name = "idx_translation_slug", columnList = "slug")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @Column(name = "lang_code", length = 5, nullable = false)
    private String langCode; // vi, en, ja, fr...


    @Column(nullable = false)
    private String slug;


    @Column(nullable = false)
    private String title;


    @Column(columnDefinition = "TEXT")
    private String content;


    @Column(columnDefinition = "TEXT")
    private String excerpt;


    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Blog post;


    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @JsonSerialize(using = LocalDateTimeToEpochSerializer.class)
    @JsonDeserialize(using = EpochToLocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;


    @UpdateTimestamp
    @Column(name = "updated_at")
    @Convert(converter = LocalDateTimeConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @JsonSerialize(using = LocalDateTimeToEpochSerializer.class)
    @JsonDeserialize(using = EpochToLocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;
}