package com.example.vti_hotel_be.modal.request;

import lombok.Data;

@Data
public class ConfirmAccountRequest {
    private String email;
    private String password;
    private String confirmationCode;
}
