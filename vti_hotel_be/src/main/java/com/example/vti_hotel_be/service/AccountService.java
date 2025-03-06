package com.example.vti_hotel_be.service;


import com.example.vti_hotel_be.modal.entity.Account;
import com.example.vti_hotel_be.modal.request.AccountRequest;
import com.example.vti_hotel_be.modal.request.MailSenderRequest;
import com.example.vti_hotel_be.modal.responseDTO.dto.AccountDTO;
import com.example.vti_hotel_be.support.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.vti_hotel_be.repository.AccountRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
//import static support.Random.randomString;


@Service
public class AccountService implements IAccountService {
    @Autowired
    public AccountRepository accountRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    private IMailSenderService mailSender;

    @Override
    public List<AccountDTO> findAccounts() {
        return accountRepository.findAll().stream()
                .map(AccountDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public AccountDTO findAccountById(int id) {
        return new AccountDTO(accountRepository.findById(id).orElseThrow(()-> new NullPointerException("Account not found")));
    }
    @Override
    public AccountDTO createAccount(AccountRequest request) throws Exception {
        Account account = request.createAccount();
        accountRepository.save(account);
        return new AccountDTO(account);
    }

    @Override
    public AccountDTO updateAccount(int id, AccountRequest request) throws Exception {
        Account account = accountRepository.findById(id).orElseThrow(()-> new NullPointerException("Account not found"));
        if (Objects.nonNull(account)) {
            request.updateAccount(account);
            accountRepository.save(account);
            return new AccountDTO(account);
        }
        return null;
    }

    @Override
    public AccountDTO register(AccountRequest request) throws Exception {
        if (accountRepository.findByEmail(request.getEmail()) != null) {
            throw new IllegalArgumentException("Email đã được sử dụng: " + request.getEmail());
        }
        Account account = request.register();
        String confirmCode = Random.randomString(6).toUpperCase(); // Chữ cái in hoa nhất quán
        account.setConfirmCode(confirmCode);
        accountRepository.save(account);

        MailSenderRequest mailSenderRequest = new MailSenderRequest();
        mailSenderRequest.setTo(account.getEmail());
        mailSenderRequest.setSubject("Cảm ơn bạn vì đã đăng ký tài khoản bên khách sạn chúng tôi.");
        mailSenderRequest.setBody("Mã xác nhận email của bạn: " + confirmCode);
        mailSender.mailSendCodeConfirm(mailSenderRequest);
        return new AccountDTO(account);
    }

    @Override
    @Transactional
    public AccountDTO confirmAccount(String email, String password, String confirmationCode) throws Exception {
        if (email != null && !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Định dạng email không hợp lệ");
        }
        // Xác thực đầu vào
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        if (confirmationCode == null || confirmationCode.trim().isEmpty()) {
            throw new IllegalArgumentException("Mã xác nhận không được để trống");
        }

        // Tìm tài khoản
        Account account = accountRepository.findByEmail(email.trim());
        if (account == null) {
            throw new IllegalArgumentException("Email không tồn tại");
        }

        // Xác minh mật khẩu
        if (!passwordEncoder.matches(password, account.getPassword())) {
            throw new IllegalArgumentException("Mật khẩu không đúng");
        }

        // Xác minh mã xác nhận (không phân biệt chữ hoa/thường và đã cắt khoảng trắng)
        String storedCode = account.getConfirmCode();
        if (storedCode == null || !storedCode.trim().equalsIgnoreCase(confirmationCode.trim())) {
            throw new IllegalArgumentException("Mã xác nhận không đúng");
        }

        // Kiểm tra trạng thái tài khoản
        if (account.getStatus() != Account.AccountStatus.PENDING) {
            throw new IllegalArgumentException("Tài khoản không ở trạng thái chờ xác nhận");
        }

        // Cập nhật tài khoản
        account.setConfirmCode(null);
        account.setStatus(Account.AccountStatus.ACTIVE);
        accountRepository.save(account);

        return new AccountDTO(account);
    }

}


