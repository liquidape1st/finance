package com.example.finance.service;

import com.example.finance.schemas.ghn.address.DistrictResponse;
import com.example.finance.schemas.ghn.address.ProvinceResponse;
import com.example.finance.schemas.ghn.address.WardResponse;
import com.example.finance.schemas.ghn.dto.DistrictDTO;
import com.example.finance.schemas.ghn.dto.ProvinceDTO;
import com.example.finance.schemas.ghn.dto.WardDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GhnService {

    private final GhnQueryService ghnQueryService;

    public List<ProvinceDTO> getProvinces() {
        List<ProvinceResponse.ProvinceItem> data = ghnQueryService.getProvinceItems();
        return data.stream().map(item -> new ProvinceDTO(item.getProvinceId(), item.getProvinceName(), item.getCode())).collect(Collectors.toList());
    }

    public Optional<String> getProvinceNameById(String id) {
        List<ProvinceResponse.ProvinceItem> data = ghnQueryService.getProvinceItems();

        return data.stream()
                .filter(s -> id.equals(String.valueOf(s.getProvinceId())))
                .map(ProvinceResponse.ProvinceItem::getProvinceName)
                .findFirst();

    }

    public List<DistrictDTO> getDistricts(String provinceId) {
        List<DistrictResponse.DistrictItem> data = ghnQueryService.getDistrictItems(provinceId);
        return data.stream().map(item -> new DistrictDTO(item.getDistrictId(), item.getProvinceId(), item.getDistrictName(), item.getCode())).collect(Collectors.toList());
    }

    public Optional<String> getDistrictNameById(String provinceId, String districtId) {
        List<DistrictResponse.DistrictItem> data = ghnQueryService.getDistrictItems(provinceId);
        return data.stream()
                .filter(s -> districtId.equals(String.valueOf(s.getDistrictId())))
                .map(DistrictResponse.DistrictItem::getDistrictName)
                .findFirst();
    }


    public List<WardDTO> getWards(String districtId) {
        List<WardResponse.WardItem> data = ghnQueryService.getWardItems(districtId);
        return data.stream().map(item -> new WardDTO(item.getWardCode(), item.getDistrictID(), item.getWardName())).collect(Collectors.toList());
    }

    public Optional<String> getWardNameByCode(String districtId, String wardCode) {
        List<WardResponse.WardItem> data = ghnQueryService.getWardItems(districtId);
        return data.stream()
                .filter(s -> wardCode.equals(String.valueOf(s.getWardCode())))
                .map(WardResponse.WardItem::getWardName)
                .findFirst();
    }
}
