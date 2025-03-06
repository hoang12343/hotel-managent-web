package com.example.vti_hotel_be.service;

import com.example.vti_hotel_be.modal.request.MailSenderRequest;
import jakarta.mail.MessagingException;

public interface IMailSenderService {
    void mailSendCodeConfirm(MailSenderRequest request) throws MessagingException;
    String mailSendForgotPassword(MailSenderRequest request) throws MessagingException;
}
