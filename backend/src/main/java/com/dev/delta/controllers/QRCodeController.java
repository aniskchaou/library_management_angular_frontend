package com.dev.delta.controllers;
import com.dev.delta.entities.QRCode;
import com.dev.delta.services.QRCodeService;
import com.google.zxing.WriterException;
import com.twilio.base.Resource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("qrcode")
@CrossOrigin(origins = "*")
@Api(value = "QRCodeController", description = "Controller for QR Codes")
public class QRCodeController {

    @Autowired
    private QRCodeService qrCodeService;

    @ApiOperation(value = "Add QR Code")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addQRCode(@Validated @RequestBody QRCode qrCode, BindingResult result) throws IOException, WriterException {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        QRCode newQRCode = qrCodeService.save(qrCode);
        qrCodeService.saveQRCodeToFile(qrCode.getIsbn(), "static/images/qrcode/" + qrCode.getIsbn() + ".png");
        return new ResponseEntity<>(newQRCode, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All QR Codes")
    @GetMapping("/all")
    public Iterable<QRCode> getAllQRCodes() {
        return qrCodeService.findAll();
    }

    @ApiOperation(value = "Get QR Code by ISBN")
    @GetMapping("/{isbn}")
    public ResponseEntity<QRCode> getQRCodeByIsbn(@PathVariable Long isbn) throws Exception {
        QRCode qrCode = qrCodeService.findById(isbn).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(qrCode, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete QR Code by ISBN")
    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<String> deleteQRCode(@PathVariable Long isbn) throws Exception {
        qrCodeService.deleteById(isbn);
        return new ResponseEntity<>("QR Code was deleted", HttpStatus.OK);
    }



    @GetMapping("/saveQRCode/{isbn}")
    public String saveQRCode(@PathVariable("isbn") String isbn) {
        try {
            // Specify the path outside the classpath (e.g., in a static directory)
            String filePath = "static/images/qrcode/" + isbn + ".png";

            // Create directories if they don't exist
            File dir = new File("static/images/qrcode/");
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Save the QR code image to disk
            qrCodeService.saveQRCodeToFile(isbn, filePath);

            return "QR Code saved to " + filePath;
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return "Error saving QR Code: " + e.getMessage();
        }
    }

    @GetMapping("/get/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName) throws IOException {
        // Construct the file path outside of the resources directory (external folder)
        Path imagePath = Paths.get("static/images/qrcode/" + imageName);

        // Create a resource object from the file path
        UrlResource imgFile = new UrlResource(imagePath.toUri());

        // Check if the file exists
        if (!imgFile.exists() || !imgFile.isReadable()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Convert the image file into a byte array for the response
        InputStream in = imgFile.getInputStream();
        byte[] imageBytes = StreamUtils.copyToByteArray(in);

        // Set HTTP headers to indicate image content (you can dynamically set this based on the file type)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG); // Adjust for different image types if necessary

        // Return the image bytes as a response entity with OK status
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

}

