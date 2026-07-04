package com.dev.delta.services;

import com.dev.delta.entities.QRCode;
import com.dev.delta.repositories.QRCodeRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class QRCodeService {

    @Autowired
    private QRCodeRepository qrCodeRepository;

    public List<QRCode> findAll() {
        return qrCodeRepository.findAll();
    }

    public Optional<QRCode> findById(Long id) {
        return qrCodeRepository.findById(id);
    }

    public QRCode save(QRCode qrCode) {
        return qrCodeRepository.save(qrCode);
    }

    public void deleteById(Long id) {
        qrCodeRepository.deleteById(id);
    }


    public void saveQRCodeToFile(String text, String filePath) throws WriterException, IOException {
        // Create a QR code writer
        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        // Encode the text into a BitMatrix for a QR code
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 300, 300);

        // Convert the BitMatrix to a BufferedImage
        BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        // Write the BufferedImage to a file
        File outputFile = new File(filePath);
        ImageIO.write(qrCodeImage, "PNG", outputFile);
    }
}

