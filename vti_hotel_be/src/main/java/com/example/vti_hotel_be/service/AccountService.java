package com.example.vti_hotel_be.service;


import com.example.vti_hotel_be.modal.entity.Account;
import com.example.vti_hotel_be.modal.request.AccountRequest;
import com.example.vti_hotel_be.modal.responseDTO.dto.AccountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.vti_hotel_be.repository.AccountRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
//import static support.Random.randomString;


@Service
public class AccountService implements IAccountService {
    @Autowired
    public AccountRepository accountRepository;

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
}


