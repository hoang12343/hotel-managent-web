package com.example.vti_hotel_be.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.example.vti_hotel_be.modal.Base;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "`account`")
@EqualsAndHashCode(callSuper = true)
public class Account extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "image_card")
    private String imageCard;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "confirmCode")
    private String confirmCode;


    public enum Gender {
        MALE, FEMALE
    }

    public enum Role {
        ADMIN,  USER
    }

    public enum AccountStatus{
        ACTIVE,PENDING, INACTIVE
    }


}