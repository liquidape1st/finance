package com.example.finance.model;

import com.example.finance.converter.EpochToLocalDateTimeDeserializer;
import com.example.finance.converter.LocalDateTimeConverter;
import com.example.finance.converter.LocalDateTimeToEpochSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "newsletters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Newsletter {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    @CreationTimestamp
    @Column(name = "subscribed_at", updatable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @JsonSerialize(using = LocalDateTimeToEpochSerializer.class)
    @JsonDeserialize(using = EpochToLocalDateTimeDeserializer.class)
    private LocalDateTime subscribedAt;
}

