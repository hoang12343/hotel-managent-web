package com.example.vti_hotel_be.modal.responseDTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String identifier;
    private Collection<? extends GrantedAuthority> authorities;
}

