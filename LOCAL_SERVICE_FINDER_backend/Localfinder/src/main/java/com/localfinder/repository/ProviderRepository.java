// src/main/java/com/localfinder/repository/ProviderRepository.java
package com.localfinder.repository;

import com.localfinder.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProviderRepository extends JpaRepository<Provider, Long> {

    List<Provider> findByServiceTypeIgnoreCase(String serviceType);

    @Query(value = "SELECT * FROM (" +
            " SELECT *, (6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(lat)))) AS distance " +
            " FROM provider " +
            " WHERE LOWER(service_type) = LOWER(:serviceType) " +
            ") AS calculated " +
            "WHERE distance < :radiusKm " +
            "ORDER BY distance",
            nativeQuery = true)
    List<Provider> findProvidersNearby(@Param("serviceType") String serviceType,
                                       @Param("lat") double lat,
                                       @Param("lng") double lng,
                                       @Param("radiusKm") double radiusKm);
}
