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
		// Attachment removed — was pointing to a hardcoded local path
		msg.setContent(multipart);
		Transport.send(msg);
	}

	public EmailSetting findEmailSettings(Long id) throws Exception {
		return emailSettingRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * Send a plain-text/HTML email using the first stored EmailSetting record.
	 * Safe to call from a scheduler — catches all exceptions so a misconfigured
	 * SMTP server cannot prevent the scheduler from processing other items.
	 *
	 * @return true if the message was dispatched, false on any error
	 */
	public boolean sendSimple(String to, String subject, String htmlBody) {
		try {
			java.util.List<EmailSetting> settings = emailSettingRepository.findAll();
			if (settings.isEmpty()) {
				System.err.println("[EmailService] No email settings configured — skipping send to: " + to);
				return false;
			}
			EmailSetting s = settings.get(0);
			sendmail(s.getAuth(), s.getEnableTLS(), s.getHost(), s.getPort(),
					 s.getEmail(), to, s.getPassword(), htmlBody, subject);
			return true;
		} catch (Exception e) {
			System.err.println("[EmailService] Failed to send email to " + to + ": " + e.getMessage());
			return false;
		}
	}
}
