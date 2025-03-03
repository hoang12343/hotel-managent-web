package com.example.vti_hotel_be.modal.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}