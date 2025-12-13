package com.example.finance.schemas.response;

import com.example.finance.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String type = "Bearer";
    private String email;
    private String fullName;
    private UserInfo user;

    public AuthResponse(String accessToken,String refreshToken, String type, String email, String fullName, User user, List<String> authorities) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.type = type;
        this.email = email;
        this.fullName = fullName;
        this.user = new UserInfo(user, authorities);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfo {
        private UUID id;
        private String email;
        private String fullName;
        private String phone;
        private String address;
        private Set<String> roles = new HashSet<>();
        private List<String> authorities = new ArrayList<>();


        public UserInfo(User user,  List<String> authorities) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.fullName = user.getFullName();
            this.phone = user.getPhone();
            this.address = user.getAddress();
            this.authorities = authorities;
            this.roles = user.getRoles() != null 
                ? user.getRoles().stream()
                    .map(role -> role.getName().name()).collect(Collectors.toSet())
                : null;
        }
    }
}

