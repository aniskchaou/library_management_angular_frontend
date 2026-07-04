package com.dev.delta.services;

import com.dev.delta.dto.TwilioProperties;
import com.dev.delta.entities.Notice;
import com.dev.delta.repositories.NoticeRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> findAll() {
        return noticeRepository.findAll();
    }

    public Optional<Notice> findById(Long id) {
        return noticeRepository.findById(id);
    }

    public Notice save(Notice notice) {
        return noticeRepository.save(notice);
    }

    public void deleteById(Long id) {
        noticeRepository.deleteById(id);
    }

    /*@Value("${twilio.phoneNumber}")
    private String twilioPhoneNumber;

    @Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    public String sendSms(String toPhoneNumber, String messageBody) {
        try {
                Twilio.init(accountSid, authToken);

            Message message = Message.creator(
                            new PhoneNumber(toPhoneNumber),  // To phone number
                            new PhoneNumber(twilioPhoneNumber),  // From Twilio phone number
                            messageBody)
                    .create();
            return message.getSid();
        } catch (Exception e) {
            throw new RuntimeException("Error while sending SMS: " + e.getMessage());
        }
    }*/

    @Autowired
    private  TwilioProperties twilioProperties;

    @PostConstruct
    public void initTwilio() {
        // Initialize Twilio with the account SID and auth token from TwilioProperties
        Twilio.init(twilioProperties.getAccountSid(), twilioProperties.getAuthToken());
    }

    public String sendSms(String toPhoneNumber, String messageBody) {
        try {
            Message message = Message.creator(
                    new PhoneNumber(toPhoneNumber),      // To phone number
                    new PhoneNumber(twilioProperties.getPhoneNumber()),  // From Twilio phone number
                    messageBody                          // Message body
            ).create();

            return message.getSid();  // Return the message SID on success
        } catch (Exception e) {
            // Log error or throw exception
            System.err.println("Error while sending SMS: " + e.getMessage());
            throw new RuntimeException("Error while sending SMS: " + e.getMessage(), e);
        }
    }


    public Notice setImportanceToHigh(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new RuntimeException("Notice not found with id " + noticeId));
        notice.setImportance("high");
        return noticeRepository.save(notice);
    }
}

