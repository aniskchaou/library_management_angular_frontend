package com.dev.delta.controllers;

import com.dev.delta.entities.Order;
import com.dev.delta.services.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("order")
@CrossOrigin(origins = "*")
@Api(value = "OrderController", description = "Controller for Orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @ApiOperation(value = "Add Order")
    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    public ResponseEntity<?> addOrder(@RequestBody Order order, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Order newOrder = orderService.save(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @ApiOperation(value = "Get All Orders")
    @GetMapping("/all")
    public Iterable<Order> getAllOrders() {
        return orderService.findAll();
    }

    @ApiOperation(value = "Get Order by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.findById(id);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @ApiOperation(value = "Delete Order by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if (!orderService.findById(id).isPresent()) {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
        orderService.deleteById(id);
        return new ResponseEntity<>("Order was deleted", HttpStatus.OK);
    }



        @GetMapping("/{orderId}/status/cancel")
        public ResponseEntity<Order> markAsCancelled(@PathVariable Long orderId) {
            Order updatedOrder = orderService.updateOrderStatus(orderId, "Cancelled");
            return ResponseEntity.ok(updatedOrder);
        }

        @GetMapping("/{orderId}/status/ship")
        public ResponseEntity<Order> markAsShipped(@PathVariable Long orderId) {
            Order updatedOrder = orderService.updateOrderStatus(orderId, "Shipped");
            return ResponseEntity.ok(updatedOrder);
        }

        @GetMapping("/{orderId}/status/deliver")
        public ResponseEntity<Order> markAsDelivered(@PathVariable Long orderId) {
            Order updatedOrder = orderService.updateOrderStatus(orderId, "Delivered");
            return ResponseEntity.ok(updatedOrder);
        }

        @GetMapping("/{orderId}/status/pending")
        public ResponseEntity<Order> markAsPending(@PathVariable Long orderId) {
            Order updatedOrder = orderService.updateOrderStatus(orderId, "Pending");
            return ResponseEntity.ok(updatedOrder);
        }
}


