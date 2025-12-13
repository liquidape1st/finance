package com.example.finance.pageable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderPageableObjectSearch extends PageableObject {
    private String status;

    public String getStatus() {
        return (status == null || status.isEmpty()) ? null : status;
    }
}
