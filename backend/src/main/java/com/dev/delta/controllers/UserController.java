package com.dev.delta.controllers;

import com.dev.delta.dto.ChangePasswordRequest;
import com.dev.delta.entities.User;
import com.dev.delta.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StreamUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.service.ResponseMessage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService; // Injecting the UserService

    // Endpoint to create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // Endpoint to get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to get all users
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Endpoint to update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Endpoint to delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint to assign a role to a user
    @PostMapping("/{userId}/roles/{roleName}")
    public ResponseEntity<Void> assignRoleToUser(@PathVariable Long userId, @PathVariable String roleName) {
        userService.assignRoleToUser(userId, roleName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to find user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<User> findUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findUserByUsername(username);
        return new ResponseEntity<User>(user.get(),HttpStatus.OK);
    }

    // Endpoint to find user by email (optional)
    @GetMapping("/email/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(id, request);
            return ResponseEntity.ok("Password changed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("username") String username) {
        if (file.isEmpty()) {
            return "No file selected!";
        }

        try {
            // Define the path where the file will be saved with username
            String uploadDirectory = System.getProperty("user.dir") + "/static/images/profile/" + username + "/";
            File directory = new File(uploadDirectory);

            // Create the directory for the username if it doesn't exist
            if (!directory.exists()) {
                directory.mkdirs();  // Create directory
            }

            // Define the new filename using the username (e.g., username_profile.png)
            String newFileName = username + "_profile.png";

            // Create the destination file object with the new name
            File destinationFile = new File(uploadDirectory + newFileName);

            // Save the file in the user-specific directory with the new name
            file.transferTo(destinationFile);
            return "File uploaded successfully: " + file.getOriginalFilename();

        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed!";
        }
    }


    @GetMapping("/get/{username}/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName,@PathVariable("username") String username) throws IOException {
        // Construct the file path outside of the resources directory (external folder)
        Path imagePath = Paths.get("static/images/profile/"+username +"/"+imageName);

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

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetPasswordEmail(String email, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the link below to reset your password:\n" + resetUrl);
        mailSender.send(message);
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Check if the user exists
        Optional<User> userOptional = userService.findByEmail(email);
        if (userOptional==null) {
            return ResponseEntity.badRequest().body(Map.of("message", "User with the given email not found"));
        }

        // Generate a temporary password
        String tempPassword = generateTemporaryPassword();
        User user = userOptional.get();

        // Hash the temporary password
        String hashedPassword = tempPassword;
        user.setPassword(hashedPassword); // Update user with hashed temp password
        userService.updateUser(user.getId(),user); // Save the updated user

        // Send email with temporary password
        String emailBody = String.format(
                "Your temporary password is: %s\n" +
                        "Please use this password to log in and change your password as soon as possible.",
                tempPassword
        );
        sendResetPasswordEmail(email, emailBody);

        return ResponseEntity.ok(Map.of("message", "Temporary password sent to your email"));
    }

    // Method to generate a temporary password
    private String generateTemporaryPassword() {
        int length = 8; // Set the desired length for the temporary password
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"; // Define character set

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            password.append(characters.charAt(index));
        }
        return password.toString();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        // Validate the token
        Optional<User> userOptional = userService.findByResetToken(token);
        if (userOptional==null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid token"));
        }

        User user = userOptional.get();

        // Hash the new password before saving
        String hashedPassword = newPassword; // Ensure this method exists
        user.setPassword(hashedPassword);
        user.setResetToken(null); // Invalidate the token after use
        userService.updateUser(user.getId(),user); // Save the updated user

        return ResponseEntity.ok(Map.of("message", "Password reset successful"));
    }
}

