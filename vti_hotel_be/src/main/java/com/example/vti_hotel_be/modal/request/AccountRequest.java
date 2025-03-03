package com.example.vti_hotel_be.modal.request;

import jakarta.validation.constraints.Email;
import lombok.Data;

import com.example.vti_hotel_be.modal.entity.Account;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static com.example.vti_hotel_be.support.ConvertString.convertToEnum;
import static com.example.vti_hotel_be.support.ConvertString.convertToLocalDate;


@Data
public class AccountRequest {
    private String fullName;
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String email;

    private String phoneNumber;
    private String imageCard;
    private String birthDate;

    private String gender;
    private String status;
    private String role;

    public Account register(){
        Account account = new Account();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password));
        account.setFullName(fullName);
        account.setGender(null);
        account.setImageCard(null);
        account.setEmail(email);
        account.setPhoneNumber(phoneNumber);
        account.setBirthDate(null);
//        account.setLevel(Account.Level.NEW_CUSTOMER);
//        account.setAmountSpent(0);
//        account.setCumulativePoints(0);
//        account.setStatus(Account.StatusAccount.PENDING);
        account.setRole(Account.Role.USER);
        return account;
    }

    public void populateAccount(Account account ) throws  Exception{
        account.setFullName(fullName);
        account.setPassword(password);
        account.setEmail(email);
        account.setUsername(username);
        account.setPhoneNumber(phoneNumber);
        account.setBirthDate(convertToLocalDate(birthDate));
        account.setImageCard(imageCard);
        account.setGender(convertToEnum(Account.Gender.class, gender));

    }
    public void updateAccount(Account account) throws Exception {
        account.setFullName(fullName);
        account.setEmail(email);
        account.setPhoneNumber(phoneNumber);
        account.setPassword(password);

        account.setImageCard(imageCard);
        account.setGender(convertToEnum(Account.Gender.class, gender));
    }


    public Account createAccount() throws Exception {
        Account account = new Account();
        account.setUsername(username);
//        account.setLevel(convertToEnum(Account.Level.class, level));
//        account.setAmountSpent(Double.parseDouble(amountSpending));
//        account.setCumulativePoints(Integer.parseInt(cumulativePoint));
        account.setImageCard(imageCard);
        account.setRole(convertToEnum(Account.Role.class, role));
        account.setGender(convertToEnum(Account.Gender.class, gender));
//        account.setStatus(convertToEnum(Account.StatusAccount.class, status));
        populateAccount(account);
        return account;

    }
}
