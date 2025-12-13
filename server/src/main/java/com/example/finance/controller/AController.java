package com.example.finance.controller;

import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.response.ResponsePayload;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;


public interface AController<RQ, ID, PQ extends PageableObject> {
    ResponseEntity<ResponsePayload> search(@Valid @RequestBody PQ pageableObject);

    ResponseEntity<ResponsePayload> search();

    ResponseEntity<ResponsePayload> create(RQ request);

    ResponseEntity<ResponsePayload> update(ID id, RQ request);

    ResponseEntity<ResponsePayload> detail(ID id);

    ResponseEntity<ResponsePayload> delete(ID id);
}
