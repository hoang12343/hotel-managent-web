package com.example.vti_hotel_be.modal.request;

import jakarta.validation.constraints.Email;
import lombok.Data;
import com.example.vti_hotel_be.modal.entity.Account;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import static com.example.vti_hotel_be.support.ConvertString.convertToEnum;
import static com.example.vti_hotel_be.support.ConvertString.convertToLocalDate;

@Data
public class AccountRequest {
    private String fullName;
    private String username;
    @Email(message = "Định dạng email không hợp lệ")
    private String email;
    private String password;
    private String confirmPassword;
    private String phoneNumber;
    private String imageCard;
    private String birthDate;
    private String gender;
    private String status;
    private String role;

    public Account register() throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        if (confirmPassword == null || confirmPassword.isEmpty()) {
            throw new IllegalArgumentException("Xác nhận mật khẩu không được để trống");
        }
        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không trùng khớp");
        }

        Account account = new Account();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        account.setUsername(username != null ? username : email);
        account.setPassword(passwordEncoder.encode(password));
        account.setFullName(fullName);
        account.setEmail(email);
        account.setPhoneNumber(phoneNumber);
        try {
            account.setBirthDate(birthDate != null ? convertToLocalDate(birthDate) : null);
        } catch (Exception e) {
            throw new IllegalArgumentException("Định dạng ngày sinh không hợp lệ");
        }
        account.setImageCard(imageCard);
        account.setGender(gender != null ? convertToEnum(Account.Gender.class, gender) : null);
        account.setStatus(Account.AccountStatus.PENDING);
        account.setRole(Account.Role.USER);
        return account;
    }

    public void populateAccount(Account account) throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        if (confirmPassword == null || confirmPassword.isEmpty()) {
            throw new IllegalArgumentException("Xác nhận mật khẩu không được để trống");
        }
        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không trùng khớp");
        }
        account.setFullName(fullName);
        account.setPassword(password);
        account.setEmail(email);
        account.setUsername(username);
        account.setPhoneNumber(phoneNumber);
        account.setBirthDate(birthDate != null ? convertToLocalDate(birthDate) : null);
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
        account.setImageCard(imageCard);
        account.setRole(convertToEnum(Account.Role.class, role));
        account.setGender(convertToEnum(Account.Gender.class, gender));
        populateAccount(account);
        return account;
    }
}