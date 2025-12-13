package com.example.finance.service;

import com.example.finance.constant.Constant;
import com.example.finance.schemas.ghn.address.DistrictResponse;
import com.example.finance.schemas.ghn.address.ProvinceResponse;
import com.example.finance.schemas.ghn.address.WardResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class GhnQueryService {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String TOKEN = Constant.GHN.TOKEN;

    @Cacheable(value = "ghn:provinces")
    public List<ProvinceResponse.ProvinceItem> getProvinceItems() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", TOKEN);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<ProvinceResponse> response = restTemplate.exchange(
                "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
                HttpMethod.GET,
                entity,
                ProvinceResponse.class
        );

        return Optional.ofNullable(response.getBody()).map(ProvinceResponse::getData).orElse(Collections.emptyList());
    }


    @Cacheable(value = "ghn:districts", key = "#provinceId")
    public List<DistrictResponse.DistrictItem> getDistrictItems(String provinceId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", TOKEN);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<DistrictResponse> response = restTemplate.exchange(
                String.format(
                        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=%s",
                        provinceId
                ),
                HttpMethod.GET,
                entity,
                DistrictResponse.class
        );

        return Optional.ofNullable(response.getBody()).map(DistrictResponse::getData).orElse(Collections.emptyList());

    }

    @Cacheable(value = "ghn:wards", key = "#districtId")
    public List<WardResponse.WardItem> getWardItems(String districtId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", TOKEN);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<WardResponse> response = restTemplate.exchange(
                String.format(
                        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=%s",
                        districtId
                ),
                HttpMethod.GET,
                entity,
                WardResponse.class
        );
        return Optional.ofNullable(response.getBody()).map(WardResponse::getData).orElse(Collections.emptyList());
    }
}
