package com.example.finance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(
        name = "tag_translations",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"tag_id", "lang_code"}),
                @UniqueConstraint(columnNames = {"lang_code", "slug"})
        },
        indexes = {
                @Index(name = "idx_tag_lang_slug", columnList = "lang_code, slug")
        }
)

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TagTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @Column(name = "lang_code", length = 5, nullable = false)
    private String langCode; // VI, EN

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String slug;
}
