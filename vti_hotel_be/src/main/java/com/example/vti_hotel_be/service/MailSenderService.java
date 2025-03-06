package com.example.vti_hotel_be.service;

import com.example.vti_hotel_be.modal.request.MailSenderRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailSenderService implements IMailSenderService {
    @Value("${spring.mail.username}")
    private String emailAdmin;

    private final JavaMailSender javaMailSender;

    @Override
    public void mailSendCodeConfirm(MailSenderRequest request) throws MessagingException {
        // Tạo tin nhắn email
        MimeMessage message = javaMailSender.createMimeMessage();
        // Tạo trợ thủ để hỗ trợ soạn email
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Đặt thông tin người gửi
        helper.setFrom(emailAdmin);
        helper.setTo(request.getTo());
        helper.setSubject(request.getSubject());
        helper.setText(request.getBody(), true);

        // Gửi email
        javaMailSender.send(message);
    }

    @Override
    public String mailSendForgotPassword(MailSenderRequest request) throws MessagingException {
        // Tạo tin nhắn email
        MimeMessage message = javaMailSender.createMimeMessage();
        // Tạo trợ thủ để hỗ trợ soạn email
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Đặt thông tin người gửi
        helper.setFrom(emailAdmin);
        helper.setTo(request.getTo());
        helper.setSubject("Đặt lại mật khẩu");
        helper.setText(request.getBody(), true);

        // Gửi email
        javaMailSender.send(message);

        // Trả về thông báo thành công
        return "Email đã được gửi thành công";
    }
}