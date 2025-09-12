package com.localfinder.controller;

import com.localfinder.model.Customer;
import com.localfinder.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3007") // Update this to match your frontend URL and port
@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // Register a new customer
    @PostMapping("/registerCustomer")
    public Customer registerCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    // Search customers by serviceNeeded (case-insensitive)
    @GetMapping("/searchCustomers")
    public List<Customer> searchCustomers(@RequestParam String serviceNeeded) {
        // Log search query for debugging
        System.out.println("Searching customers with serviceNeeded: " + serviceNeeded);

        List<Customer> results = customerRepository.findByServiceNeededIgnoreCase(serviceNeeded);

        System.out.println("Found " + results.size() + " customers for serviceNeeded: " + serviceNeeded);
        return results;
    }
}
