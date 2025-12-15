package com.example.finance.pageable;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
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

}