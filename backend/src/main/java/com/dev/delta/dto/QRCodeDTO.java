package com.dev.delta.dto;

import com.dev.delta.entities.QRCode;
import com.dev.delta.repositories.QRCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QRCodeDTO implements DTO {

    @Autowired
    QRCodeRepository qrCodeRepository;

    @Override
    public void populate() {
        createAndSaveQRCode("978-3-16-148410-0", 200, 200, 10);
        createAndSaveQRCode("978-1-56619-909-4", 220, 220, 15);
        createAndSaveQRCode("978-0-596-52068-7", 240, 240, 20);
        createAndSaveQRCode("978-0-306-40615-7", 250, 250, 25);
        createAndSaveQRCode("978-0-201-63361-0", 210, 210, 12);
        createAndSaveQRCode("978-1-4028-9462-6", 230, 230, 18);
        createAndSaveQRCode("978-0-7356-4533-7", 250, 250, 22);
        createAndSaveQRCode("978-1-56619-926-1", 260, 260, 30);
        createAndSaveQRCode("978-0-13-110362-7", 270, 270, 35);
        createAndSaveQRCode("978-0-7356-6745-7", 280, 280, 40);
    }

    private void createAndSaveQRCode(String isbn, int width, int height, int margin) {
        QRCode qrCode = new QRCode();
        qrCode.setIsbn(isbn);
        qrCode.setWidth(width);
        qrCode.setHeight(height);
        qrCode.setMargin(margin);
        qrCodeRepository.save(qrCode);
    }
}

