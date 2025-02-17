package controller;

import modal.request.AccountRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.IAccountService;

@RestController
@RequestMapping("/hotel")
public class AccountController {

    @Autowired
    private IAccountService accountService;

    @GetMapping("/findAccountById")
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAccountById(@RequestParam("accountId") int id){
        try{
            return new ResponseEntity<>(accountService.findAccountById(id), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/createAccountByAdmin")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> createAccountByAdmin(@RequestBody AccountRequest request){
        try {
            return new ResponseEntity<>(accountService.createAccount(request), HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/updateAccount")
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> updateAccount(@RequestParam("accountId") int id, @RequestBody AccountRequest request){
        try{
            return new ResponseEntity<>(accountService.updateAccount(id, request), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
