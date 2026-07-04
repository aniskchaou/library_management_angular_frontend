package com.dev.delta.controllers;

import com.dev.delta.entities.Contract;
import com.dev.delta.services.ContractService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.util.*;

@RestController
@RequestMapping("contract")
@CrossOrigin(origins = "*")
@Api(value = "ContractController", description = "Controller for Contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @ApiOperation(value = "Add Contract")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    public ResponseEntity<?> addContract( @RequestBody Contract contract, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Contract newContract = contractService.save(contract);
        return new ResponseEntity<>(newContract, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Contracts")
    @GetMapping("/all")
    public Iterable<Contract> getAllContracts() {
        return contractService.findAll();
    }

    @ApiOperation(value = "Get Contract by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        Optional<Contract> contract = contractService.findById(id);
        return contract.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @ApiOperation(value = "Delete Contract by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContract(@PathVariable Long id) {
        if (!contractService.findById(id).isPresent()) {
            return new ResponseEntity<>("Contract not found", HttpStatus.NOT_FOUND);
        }
        contractService.deleteById(id);
        return new ResponseEntity<>("Contract was deleted", HttpStatus.OK);
    }

    @ApiOperation(value = "Update Contract Details")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateContract(@PathVariable Long id,  @RequestBody Contract contractDetails, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Optional<Contract> existingContract = contractService.findById(id);
        if (!existingContract.isPresent()) {
            return new ResponseEntity<>("Contract not found", HttpStatus.NOT_FOUND);
        }

        Contract contract = existingContract.get();
        contract.setContractNumber(contractDetails.getContractNumber());
        contract.setStartDate(contractDetails.getStartDate());
        contract.setEndDate(contractDetails.getEndDate());
        contract.setVendor(contractDetails.getVendor());
       // contract.setOrders(contractDetails.getOrders());
        contract.setTerms(contractDetails.getTerms());

        Contract updatedContract = contractService.save(contract);
        return new ResponseEntity<>(updatedContract, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("vendorId") String vendorId) {
        if (file.isEmpty()) {
            return "No file selected!";
        }

        try {
            // Define the path where the file will be saved with vendorId
            String uploadDirectory = System.getProperty("user.dir") + "/static/images/contract/" + vendorId + "/";
            File directory = new File(uploadDirectory);

            // Create the directory for the vendorId if it doesn't exist
            if (!directory.exists()) {
                directory.mkdirs();  // Create directory
            }

            // Save the file in the vendor-specific directory
            File destinationFile = new File(uploadDirectory + file.getOriginalFilename());
            file.transferTo(destinationFile);

            return "File uploaded successfully: " + file.getOriginalFilename();

        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed!";
        }
    }

    @GetMapping("/files/{vendorId}")
    public ResponseEntity<List<Map<String, String>>> listFiles(@PathVariable("vendorId") String vendorId, HttpServletRequest request) {
        // Define the directory path where the files are stored for this vendorId
        String directoryPath = System.getProperty("user.dir") + "/static/images/contract/" + vendorId + "/";
        File directory = new File(directoryPath);

        // List to store the file information (filename and URL)
        List<Map<String, String>> fileList = new ArrayList<>();

        if (directory.exists() && directory.isDirectory()) {
            // Get the list of files
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        // Get the filename
                        String filename = file.getName();

                        // Create a URL for accessing the file via HTTP
                        String fileUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                                + "/static/images/contract/" + vendorId + "/" + filename;

                        // Create a map with the filename and URL
                        Map<String, String> fileInfo = new HashMap<>();
                        fileInfo.put("filename", filename);
                        //fileInfo.put("url", fileUrl);

                        // Add the file info to the list
                        fileList.add(fileInfo);
                    }
                }
            }
        }

        // Return the list of file information as a JSON response
        return ResponseEntity.ok(fileList);
    }


    @GetMapping("/vendor-files/{vendorId}/{filename}")
    public ResponseEntity<Resource> serveFile(
            @PathVariable("vendorId") String vendorId,
            @PathVariable("filename") String filename
    ) {
        try {
            // Define the directory path and construct the full file path
            String filePath = System.getProperty("user.dir") + "/static/images/contract/" + vendorId + "/" + filename;
            File file = new File(filePath);

            // Check if the file exists
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Detect the file content type (e.g., image/jpeg or application/pdf)
            String contentType = Files.probeContentType(file.toPath());

            // If content type could not be determined, set it as binary
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // Load the file as a resource
            Resource resource = new UrlResource(file.toURI());

            // Return the file content with appropriate content type
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
