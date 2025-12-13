package com.example.finance.pageable;


import lombok.*;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductPageableObjectSearch extends PageableObject {
    private String category;

    public String getCategory() {
        return ( category == null || category.isEmpty()) ? null : category;
    }
}