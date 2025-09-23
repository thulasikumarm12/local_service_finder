// src/main/java/com/localfinder/controller/ProviderController.java
package com.localfinder.controller;

import com.localfinder.model.Provider;
import com.localfinder.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://local-service-finder-13.onrender.com")  // Adjust if frontend port differs
@RestController
@RequestMapping("/api")
public class ProviderController {

    @Autowired
    private ProviderRepository providerRepository;

    @PostMapping("/registerProvider")
    public Provider registerProvider(@RequestBody Provider provider) {
        return providerRepository.save(provider);
    }

    // Simple search by service
    @GetMapping("/searchProviders")
    public List<Provider> searchProviders(@RequestParam String serviceType) {
        return providerRepository.findByServiceTypeIgnoreCase(serviceType);
    }

    // 🔥 Location + radius-based search (Used by CustomerSearch.js)
    @GetMapping("/searchProvidersByServiceAndLocation")
    public List<Provider> searchProvidersByServiceAndLocation(
            @RequestParam String serviceType,
            @RequestParam double lat,
            @RequestParam double lng
    ) {
        double radiusKm = 10.0;  // Customize radius if needed
        return providerRepository.findProvidersNearby(serviceType, lat, lng, radiusKm);
    }
}
