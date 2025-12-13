package com.example.finance.controller;

import com.example.finance.service.GhnService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressController extends BaseController {
    GhnService ghnService;

    public AddressController(MessageSource messageSource, GhnService ghnService) {
        super(messageSource);
        this.ghnService = ghnService;
    }

    @GetMapping(value = "/province")
    public ResponseEntity<?> getProvinces() {
        return createResponse(
                ghnService.getProvinces(),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/district")
    public ResponseEntity<?> getDistricts(@RequestParam String provinceId) {
        return createResponse(
                ghnService.getDistricts(provinceId),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/ward")
    public ResponseEntity<?> getWards(@RequestParam String districtId) {
        return createResponse(
                ghnService.getWards(districtId),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }


}
