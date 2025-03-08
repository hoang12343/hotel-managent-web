package com.example.vti_hotel_be.service;


import com.example.vti_hotel_be.modal.request.AccountRequest;
import com.example.vti_hotel_be.modal.responseDTO.dto.AccountDTO;
import jakarta.mail.MessagingException;

import java.util.List;

public interface IAccountService {
    // find
    List<AccountDTO> findAccounts();
    AccountDTO findAccountById(int id);


    // create

    AccountDTO createAccount(AccountRequest request) throws Exception;


    // update
    AccountDTO updateAccount(int id, AccountRequest request) throws Exception;

    //register
    AccountDTO register(AccountRequest request) throws Exception;
    AccountDTO confirmAccount(String email, String password, String confirmationCode) throws Exception;
    void resendConfirmationCode(String email) throws Exception;

}
