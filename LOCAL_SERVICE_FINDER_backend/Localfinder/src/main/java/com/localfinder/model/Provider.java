package com.localfinder.model;

import jakarta.persistence.*;

@Entity
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String contact;
    private String location;
    private String serviceType;
    private Double lat;
    private Double lng;
    public Provider() {
    }

    
    public Provider(Long id, String name, String contact, String location, String serviceType, Double lat, Double lng) {
		super();
		this.id = id;
		this.name = name;
		this.contact = contact;
		this.location = location;
		this.serviceType = serviceType;
		this.lat = lat;
		this.lng = lng;
	}

	public Long getId() {
        return id;
    }

    public Double getLat() {
		return lat;
	}


	public void setLat(Double lat) {
		this.lat = lat;
	}


	public Double getLng() {
		return lng;
	}


	public void setLng(Double lng) {
		this.lng = lng;
	}


	public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }
}
