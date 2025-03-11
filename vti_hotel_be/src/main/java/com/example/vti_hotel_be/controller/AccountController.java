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
    public ResponseEntity<?> registerAccount(@Valid @RequestBody AccountRequest request) {
        try {
            AccountDTO accountDTO = accountService.register(request);
            return new ResponseEntity<>(accountDTO, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi server: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/confirmAccount")
    public ResponseEntity<?> confirmAccount(
            @RequestParam("email") String email,
            @RequestParam("confirmCode") String confirmCode) {
        try {
            AccountDTO accountDTO = accountService.confirmAccount(email, confirmCode);
            return new ResponseEntity<>(accountDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/resendConfirmationCode")
    public ResponseEntity<?> resendConfirmationCode(@RequestParam("email") String email) {
        try {
            accountService.resendConfirmationCode(email);
            return new ResponseEntity<>("Mã xác nhận mới đã được gửi", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
