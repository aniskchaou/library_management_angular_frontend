package com.dev.delta.services;

import com.dev.delta.entities.Order;
import com.dev.delta.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Retrieve all orders from the repository.
     *
     * @return a list of all orders
     */
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    /**
     * Retrieve an order by its ID.
     *
     * @param id the ID of the order
     * @return an Optional containing the order if found, otherwise empty
     */
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    /**
     * Save a new or existing order to the repository.
     *
     * @param order the order to save
     * @return the saved order
     */
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Delete an order by its ID.
     *
     * @param id the ID of the order to delete
     */
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    /**
     * Calculate the total cost of an order.
     *
     * @param orderId the ID of the order
     * @return the total cost of the order
     */
    public Double calculateTotalCost(Long orderId) {
        Optional<Order> orderOpt = findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            return order.getItems().stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
        }
        return 0.0;
    }

    /**
     * Update the status of an order.
     *
     * @param orderId the ID of the order
     * @param status  the new status to set
     * @return the updated order
     */
    public Order updateOrderStatus(Long orderId, String status) {
        Optional<Order> orderOpt = findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(status);
            return save(order);
        }
        return null; // Or throw an exception based on your application's requirements
    }


}
