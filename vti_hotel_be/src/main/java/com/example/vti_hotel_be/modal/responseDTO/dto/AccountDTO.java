package com.example.vti_hotel_be.modal.responseDTO.dto;

import com.example.vti_hotel_be.modal.entity.Account;
import lombok.Data;

@Data

public class AccountDTO {
    private String accountId;
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
    private String birthDate;
    private String imageCard;
    private String gender;
    private String status;
    private String role;
    private String confirmCode;
    public AccountDTO(Account account) {
        this.accountId = String.valueOf(account.getId());
        this.fullName = account.getFullName() != null ? account.getFullName() : null;
        this.username = account.getUsername() != null ? account.getUsername() : null;
        this.email = account.getEmail() != null ? account.getEmail() : null;
        this.phoneNumber = account.getPhoneNumber() != null ? account.getPhoneNumber() : null;
        this.birthDate = account.getBirthDate() != null ? String.valueOf(account.getBirthDate()) : null;
        this.imageCard = account.getImageCard() != null ? account.getImageCard() : null;
        this.gender = account.getGender() != null ? account.getGender().toString() : null;
        this.status = account.getStatus() != null ? account.getStatus().toString() : null;
        this.confirmCode = account.getConfirmCode() != null ? account.getConfirmCode() : null;


    }

}
