package com.dev.delta.services;

import com.dev.delta.entities.BarCode;
import com.dev.delta.repositories.BarCodeRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BarCodeService {

    @Autowired
    private BarCodeRepository barCodeRepository;

    public List<BarCode> findAll() {
        return barCodeRepository.findAll();
    }

    public Optional<BarCode> findById(Long id) {
        return barCodeRepository.findById(id);
    }

    public BarCode save(BarCode barCode) {
        return barCodeRepository.save(barCode);
    }

    public void deleteById(Long id) {
        barCodeRepository.deleteById(id);
    }

    public void saveBarcodeToFile(String text, String filePath) throws WriterException, IOException {
        // Create a barcode writer for Code 128
        Code128Writer barcodeWriter = new Code128Writer();

        // Encode the text into a BitMatrix
        BitMatrix bitMatrix = barcodeWriter.encode(text, BarcodeFormat.CODE_128, 300, 150);

        // Convert the BitMatrix to a BufferedImage
        BufferedImage barcodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        // Write the BufferedImage to a file
        File outputFile = new File(filePath);
        ImageIO.write(barcodeImage, "PNG", outputFile);
    }
}

