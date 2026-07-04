package com.dev.delta.dto;

import com.dev.delta.entities.BarCode;
import com.dev.delta.repositories.BarCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BarCodeDTO implements DTO {

    @Autowired
    BarCodeRepository barCodeRepository;

    @Override
    public void populate() {
        createAndSaveBarCode("978-3-16-148410-0", "Code 128", 200, 100, true, "Arial", "Black", 10, 0);
        createAndSaveBarCode("978-1-56619-909-4", "EAN-13", 180, 90, false, "Times New Roman", "Blue", 15, 90);
//        createAndSaveBarCode("978-0-596-52068-7", "UPC-A", 220, 110, true, "Verdana", "Red", 5, 45);
//        createAndSaveBarCode("978-0-306-40615-7", "QR Code", 240, 120, false, "Tahoma", "Green", 20, 180);
//        createAndSaveBarCode("978-0-201-63361-0", "Code 39", 210, 105, true, "Courier", "Purple", 12, 30);
//        createAndSaveBarCode("978-1-4028-9462-6", "ITF-14", 190, 95, false, "Georgia", "Orange", 8, 60);
//        createAndSaveBarCode("978-0-262-03384-8", "Code 93", 230, 115, true, "Arial Black", "Pink", 14, 15);
//        createAndSaveBarCode("978-0-7356-6745-7", "Codabar", 205, 102, false, "Comic Sans MS", "Cyan", 7, 75);
//        createAndSaveBarCode("978-1-56619-926-1", "Aztec Code", 215, 107, true, "Impact", "Gray", 10, 120);
//        createAndSaveBarCode("978-0-13-110362-7", "Data Matrix", 225, 112, false, "Lucida Console", "Magenta", 12, 45);
    }

    private void createAndSaveBarCode(String isbn, String type, int width, int height, boolean displayValue, String font, String color, int margin, int rotation) {
        BarCode barCode = new BarCode();
        barCode.setIsbn(isbn);
        barCode.setType(type);
        barCode.setWidth(width);
        barCode.setHeight(height);
        barCode.setDisplayValue(displayValue);
        barCode.setFont(font);
        barCode.setColor(color);
        barCode.setMargin(margin);
        barCode.setRotation(rotation);
        barCodeRepository.save(barCode);
    }
}

