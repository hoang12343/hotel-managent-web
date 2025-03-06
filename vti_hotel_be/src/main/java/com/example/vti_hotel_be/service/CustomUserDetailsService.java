package com.example.vti_hotel_be.service;

import com.example.vti_hotel_be.modal.entity.Account;
import com.example.vti_hotel_be.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Tìm tài khoản theo email
        Account account = accountRepository.findByEmail(email);
        if (account == null) {
            throw new UsernameNotFoundException("Không tìm thấy người dùng với email: " + email);
        }

        // Kiểm tra trạng thái tài khoản
        if (account.getStatus() != Account.AccountStatus.ACTIVE) {
            throw new UsernameNotFoundException("Tài khoản chưa được kích hoạt cho email: " + email);
        }

        // Trả về thông tin người dùng với email và quyền hạn
        return new User(
                account.getEmail(), // Sử dụng email thay vì username
                account.getPassword(),
                AuthorityUtils.createAuthorityList("ROLE_" + account.getRole().name())
        );
    }
}