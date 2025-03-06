package com.example.vti_hotel_be.controller;

import com.example.vti_hotel_be.modal.request.AccountRequest;
import com.example.vti_hotel_be.modal.request.ConfirmAccountRequest;
import com.example.vti_hotel_be.modal.responseDTO.dto.AccountDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.vti_hotel_be.service.IAccountService;

@RestController
@CrossOrigin("*")
@RequestMapping("/hotel")
public class AccountController {

    @Autowired
    private IAccountService accountService;

    @GetMapping("/findAccount")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAccounts(){
        try{
            return new ResponseEntity<>(accountService.findAccounts(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findAccountById")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAccountById(@RequestParam("accountId") int id){
        try{
            return new ResponseEntity<>(accountService.findAccountById(id), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/createAccountByAdmin")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> createAccountByAdmin(@RequestBody AccountRequest request){
        try {
            return new ResponseEntity<>(accountService.createAccount(request), HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/updateAccount")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> updateAccount(@RequestParam("accountId") int id, @RequestBody AccountRequest request){
        try{
            return new ResponseEntity<>(accountService.updateAccount(id, request), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerAccount(@RequestBody AccountRequest request){
        try{
            return new ResponseEntity<>(accountService.register(request), HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/confirmAccount")
    public ResponseEntity<?> confirmAccount(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("confirmCode") String confirmCode) {
        try {
            AccountDTO accountDTO = accountService.confirmAccount(
                    email.trim(),
                    password,
                    confirmCode.trim()
            );
            return new ResponseEntity<>(accountDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
