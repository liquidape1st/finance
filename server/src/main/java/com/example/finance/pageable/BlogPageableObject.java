package com.example.finance.pageable;

import com.example.finance.model.Blog;
import lombok.*;

import java.util.UUID;

/**
 * A class representing pagination and sorting parameters for database queries.
 * This class provides functionality to convert pagination parameters into Spring's Pageable object.
 *
 * @author PHAH04
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogPageableObject extends PageableObject{
    private UUID category;
    private Blog.UiType uiType;
}