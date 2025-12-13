package com.example.finance.controller;

import com.example.finance.repository.UserRepository;
import com.example.finance.schemas.request.AuthRequest;
import com.example.finance.schemas.request.RegisterRequest;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.AuthService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController extends BaseController {

    AuthService authService;
    UserRepository userRepository;

    public AuthController(MessageSource messageSource, AuthService authService, UserRepository userRepository) {
        super(messageSource);
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponsePayload> register(@Valid @RequestBody RegisterRequest request) {
        return createResponse(
                authService.register(request),
                "auth.register.success",
                "200",
                HttpStatus.OK
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ResponsePayload> login(@Valid @RequestBody AuthRequest request) {
        return createResponse(
                authService.login(request),
                "auth.login.success",
                "200",
                HttpStatus.OK
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ResponsePayload> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return createResponse(
                userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found")),
                "auth.me.information.success",
                "200",
                HttpStatus.OK
        );
    }
}
