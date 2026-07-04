package com.dev.delta.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("version")
@CrossOrigin(origins = "*")
public class VersionController {

    @Value("${app.version}")
    private String appVersion;

    @GetMapping("/api/version")
    public String getVersion() {
        return appVersion;
    }


    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "No file selected!";
        }

        try {
            // Define the path where the file will be saved
            String uploadDirectory = System.getProperty("user.dir") + "/static/images/app/";
            File directory = new File(uploadDirectory);

            // Create the directory if it doesn't exist
            if (!directory.exists()) {
                directory.mkdirs();  // Create the directory
            }

            // Define the filename (e.g., logo.png)
            String newFileName = "logo.png";

            // Create the destination file object with the new name
            File destinationFile = new File(uploadDirectory + newFileName);

            // Check if the file already exists, and delete it
            if (destinationFile.exists()) {
                if (!destinationFile.delete()) {
                    return "Failed to delete the existing logo file!";
                }
            }

            // Save the new file with the same name
            file.transferTo(destinationFile);

            return "File uploaded successfully: " + file.getOriginalFilename();

        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed!";
        }
    }

    @GetMapping("/get/logo")
    public ResponseEntity<byte[]> getImage() throws IOException {
        // Construct the file path outside of the resources directory (external folder)
        Path imagePath = Paths.get("static/images/app/logo.png");

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
