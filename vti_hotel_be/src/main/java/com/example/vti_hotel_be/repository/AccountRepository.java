package com.example.vti_hotel_be.repository;


import com.example.vti_hotel_be.modal.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByEmail(String email);
    Optional<Account> findByUsername(String username);

}
