package com.example.finance.security;

import com.example.finance.model.User;
import com.example.finance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(getAuthorities(user))
                .build();
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return user.getRoles().stream()
                .flatMap(role -> {
                    // Add role authority
                    java.util.stream.Stream<GrantedAuthority> roleAuth = java.util.stream.Stream.of(
                            new SimpleGrantedAuthority("ROLE_" + role.getName().name())
                    );
                    // Add permission authorities
                    java.util.stream.Stream<GrantedAuthority> permAuths = role.getPermissions().stream()
                            .map(permission -> new SimpleGrantedAuthority(permission.getName()));
                    // Combine role and permissions
                    return java.util.stream.Stream.concat(roleAuth, permAuths);
                })
                .collect(Collectors.toList());
    }
}

