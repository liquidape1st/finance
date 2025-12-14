package com.example.finance.model;

import com.example.finance.converter.EpochToLocalDateTimeDeserializer;
import com.example.finance.converter.LocalDateTimeConverter;
import com.example.finance.converter.LocalDateTimeToEpochSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @Column(name = "featured", nullable = false)
    private Boolean featured = false;


    private String image;


    private String author;


    @Column(name = "estimated_read_time")
    private Integer estimatedReadTime = 5;


    @JsonManagedReference
    @OneToMany(
            mappedBy = "post",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<BlogTranslation> translations = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category blogCategory;


    @Column(name = "published_at")
    @Convert(converter = LocalDateTimeConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @JsonSerialize(using = LocalDateTimeToEpochSerializer.class)
    @JsonDeserialize(using = EpochToLocalDateTimeDeserializer.class)
    private LocalDateTime publishedAt;


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

