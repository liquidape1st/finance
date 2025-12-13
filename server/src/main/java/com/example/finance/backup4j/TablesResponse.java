package com.example.finance.backup4j;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TablesResponse {
    private List<String> tables;
    private List<String> views;
}
