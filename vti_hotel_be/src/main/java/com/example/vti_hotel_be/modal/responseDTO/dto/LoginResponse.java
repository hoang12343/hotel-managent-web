package com.example.vti_hotel_be.modal.responseDTO.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;
}
