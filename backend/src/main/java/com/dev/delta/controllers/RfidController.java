package com.dev.delta.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * RFID Integration Stub.
 *
 * Real RFID hardware (e.g. Impinj, Zebra) communicates over TCP/serial or
 * vendor SDK. This controller provides the REST interface that an RFID
 * middleware agent (running locally on the desk hardware) can call into.
 *
 * The middleware agent should:
 *   1. Read a tag from the RFID reader hardware
 *   2. POST the EPC/barcode to /rfid/scan
 *   3. Use the returned book/member data to trigger checkout/checkin
 *
 * Endpoints: /rfid/**
 */
@RestController
@RequestMapping("rfid")
@CrossOrigin(origins = "*")
public class RfidController {

    /**
     * Register an RFID tag EPC against a book barcode.
     * Body: { epc: "E2000017...", barcode: "978..." }
     */
    @PostMapping("/tag/register")
    public ResponseEntity<?> registerTag(@RequestBody Map<String, String> body) {
        String epc     = body.get("epc");
        String barcode = body.get("barcode");
        if (epc == null || barcode == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "epc and barcode are required"));
        }
        // TODO: persist to rfid_tag table (entity to be created) and link to CatalogItem by barcode
        return ResponseEntity.ok(Map.of(
                "registered", true,
                "epc", epc,
                "barcode", barcode,
                "message", "Tag registered — persistence layer pending hardware configuration"
        ));
    }

    /**
     * Process an RFID scan event (called by local hardware middleware).
     * Body: { epc: "...", readerLocation: "entrance" }
     * Returns: book/member lookup result so middleware can act on it.
     */
    @PostMapping("/scan")
    public ResponseEntity<?> scan(@RequestBody Map<String, String> body) {
        String epc      = body.get("epc");
        String location = body.getOrDefault("readerLocation", "unknown");
        // TODO: lookup tag by epc in rfid_tag table, return linked CatalogItem
        return ResponseEntity.ok(Map.of(
                "epc", epc,
                "location", location,
                "status", "PENDING_LOOKUP",
                "message", "RFID middleware connected. Book lookup requires RFID tag registration."
        ));
    }

    /**
     * Inventory sweep — bulk scan result from an RFID antenna sweep.
     * Body: { epcs: ["E200...", "E200..."] }
     */
    @PostMapping("/inventory")
    public ResponseEntity<?> inventory(@RequestBody Map<String, Object> body) {
        Object epcs = body.get("epcs");
        // TODO: resolve each EPC to a CatalogItem and return stock differences
        return ResponseEntity.ok(Map.of(
                "received", epcs,
                "status", "INVENTORY_QUEUED",
                "message", "Inventory batch received. Processing requires full RFID tag table."
        ));
    }

    /** Health-check for RFID reader connectivity */
    @GetMapping("/reader/status")
    public ResponseEntity<?> readerStatus(@RequestParam(defaultValue = "main") String reader) {
        return ResponseEntity.ok(Map.of(
                "reader", reader,
                "connected", false,
                "message", "RFID reader not yet configured. Please set up hardware via Settings > RFID."
        ));
    }
}
