package com.example.finance.service;

import com.example.finance.schemas.request.AuthRequest;
import com.example.finance.schemas.response.AuthResponse;
import com.example.finance.schemas.request.RegisterRequest;
import com.example.finance.model.Role;
import com.example.finance.model.User;
import com.example.finance.repository.RoleRepository;
import com.example.finance.repository.UserRepository;
import com.example.finance.security.CustomUserDetailsService;
import com.example.finance.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        // Assign USER role by default
        Role userRole = roleRepository.findByName(Role.RoleName.USER)
                .orElseThrow(() -> new RuntimeException("Role USER not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return answerAuthenticateResponse(savedUser);
    }

    private AuthResponse answerAuthenticateResponse(User savedUser) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());

        List<String> authorities = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String accessToken = jwtTokenProvider.generateToken(userDetails, JwtTokenProvider.TokenType.ACCESS);
        String refreshToken = jwtTokenProvider.generateToken(userDetails, JwtTokenProvider.TokenType.REFRESH);
        return new AuthResponse(accessToken, refreshToken, "Bearer", savedUser.getEmail(), savedUser.getFullName(), savedUser, authorities);
    }

    public AuthResponse login(AuthRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return answerAuthenticateResponse(user);
    }

    public AuthResponse refresh(String refreshToken) {
        String username = jwtTokenProvider.extractUsername(refreshToken);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtTokenProvider.validateToken(refreshToken, userDetails)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return answerAuthenticateResponse(user);
    }
}

