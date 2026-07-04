package com.dev.delta.email;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	EmailSettingRepository emailSettingRepository;

	public void sendmail(String auth, String enableTLS, String host, String port, String email, String receiver,
			String password, String body, String subject) throws Exception {

		Properties props = new Properties();
		props.put("mail.smtp.auth", auth);
		props.put("mail.smtp.starttls.enable", enableTLS);
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", port);
		

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(email, password);
			}
		});
		Message msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress(email, false));

		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receiver));
		msg.setSubject(subject);
		msg.setContent(body, "text/html");
		msg.setSentDate(new Date());

		MimeBodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent(body, "text/html");

		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);
		MimeBodyPart attachPart = new MimeBodyPart();

		attachPart.attachFile("C:\\Users\\Admin\\Pictures\\notification.JPG");
		multipart.addBodyPart(attachPart);
		msg.setContent(multipart);
		Transport.send(msg);
	}

	public EmailSetting findEmailSettings(Long id) throws Exception {
		return emailSettingRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}
}
