package com.example.finance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "blog_post_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "blogCategory", cascade = CascadeType.ALL)
    private List<BlogPost> posts;
}
