package com.dev.delta.controllers;

import com.dev.delta.entities.BarCode;
import com.dev.delta.entities.QRCode;
import com.dev.delta.services.BarCodeService;
import com.google.zxing.WriterException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("barcode")
@CrossOrigin(origins = "*")
@Api(value = "BarCodeController", description = "Controller for Bar Codes")
public class BarCodeController {

    @Autowired
    private BarCodeService barCodeService;

    @ApiOperation(value = "Add Bar Code")
    @PostMapping("/create")
    @ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 404, message = "not found") })
    public ResponseEntity<?> addBarCode(@Validated @RequestBody BarCode barCode, BindingResult result) throws IOException, WriterException {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        BarCode newBarCode = barCodeService.save(barCode);
        barCodeService.saveBarcodeToFile(barCode.getIsbn(), "static/images/barcode/" + barCode.getIsbn() + ".png");

        return new ResponseEntity<>(newBarCode, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Bar Codes")
    @GetMapping("/all")
    public Iterable<BarCode> getAllBarCodes() {
        return barCodeService.findAll();
    }

   /* @ApiOperation(value = "Get Bar Code by ISBN")
    @GetMapping("/{isbn}")
    public ResponseEntity<BarCode> getBarCodeByIsbn(@PathVariable Long isbn) throws Exception {
        BarCode barCode = barCodeService.findById(isbn).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(barCode, HttpStatus.OK);
    }*/

  /*  @ApiOperation(value = "Delete Bar Code by ISBN")
    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<String> deleteBarCode(@PathVariable Long isbn) throws Exception {
        barCodeService.deleteById(isbn);
        return new ResponseEntity<>("Bar Code was deleted", HttpStatus.OK);
    }*/

    @Autowired
    private BarCodeService barcodeService;

   /* @GetMapping("/saveBarcode")
    public String saveBarcode(@RequestParam("text") String text) {
        try {
            // Specify the path where you want to save the barcode image
            String filePath = "1.png";

            // Save the barcode image to disk
            barcodeService.saveBarcodeToFile(text, filePath);

            return "Barcode saved to " + filePath;
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return "Error saving barcode: " + e.getMessage();
        }
    }*/


    @ApiOperation(value = "Get Bar Code by ISBN")
    @GetMapping("/{isbn}")
    public ResponseEntity<BarCode> getBarCodeByIsbn(@PathVariable Long isbn) throws Exception {
        BarCode qrCode = barcodeService.findById(isbn).orElseThrow(() -> new Exception("Not found"));
        return new ResponseEntity<>(qrCode, HttpStatus.OK);
    }

    @ApiOperation(value = "Delete Bar Code by ISBN")
    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<String> deleteBarCode(@PathVariable Long isbn) throws Exception {
        barcodeService.deleteById(isbn);
        return new ResponseEntity<>("QR Code was deleted", HttpStatus.OK);
    }



    @GetMapping("/saveBarCode/{isbn}")
    public String saveBarCode(@PathVariable("isbn") String isbn) {
        try {
            // Specify the path outside the classpath (e.g., in a static directory)
            String filePath = "static/images/barcode/" + isbn + ".png";

            // Create directories if they don't exist
            File dir = new File("static/images/barcode/");
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Save the QR code image to disk
            barcodeService.saveBarcodeToFile(isbn, filePath);

            return "Bar Code saved to " + filePath;
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return "Error saving Bar Code: " + e.getMessage();
        }
    }

    @GetMapping("/get/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName) throws IOException {
        // Construct the file path outside of the resources directory (external folder)
        Path imagePath = Paths.get("static/images/barcode/" + imageName);

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

