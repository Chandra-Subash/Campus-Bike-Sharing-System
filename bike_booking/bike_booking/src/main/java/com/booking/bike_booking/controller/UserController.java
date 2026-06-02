package com.booking.bike_booking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.bike_booking.model.Bike;
import com.booking.bike_booking.service.OwnerService;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    private final OwnerService ownerService;

    public UserController(
            OwnerService ownerService) {

        this.ownerService = ownerService;
    }

    @GetMapping("/available-bikes")
    public List<Bike> getAvailableBikes() {

        return ownerService
                .getAvailableBikes();
    }
}
