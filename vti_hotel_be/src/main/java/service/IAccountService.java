package service;


import modal.request.AccountRequest;
import modal.responseDTO.dto.AccountDTO;

import java.util.List;

public interface IAccountService {
    // find
    List<AccountDTO> findAccounts();
    AccountDTO findAccountById(int id);


    // create
    AccountDTO createAccount(AccountRequest request) throws Exception;


    // update
    AccountDTO updateAccount(int id, AccountRequest request) throws Exception;
}
