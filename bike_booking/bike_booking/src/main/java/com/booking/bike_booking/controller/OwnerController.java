package com.booking.bike_booking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.bike_booking.dto.AddBikeReq;
import com.booking.bike_booking.model.Bike;
import com.booking.bike_booking.model.Booking;
import com.booking.bike_booking.service.BookingService;
import com.booking.bike_booking.service.OwnerService;

@RestController
@RequestMapping("/owner")
@CrossOrigin("http://localhost:5173")
public class OwnerController {

    private final OwnerService ownerService;
    private final BookingService bookingService;

    public OwnerController(
            OwnerService ownerService, BookingService bookingService) {

        this.ownerService = ownerService;
        this.bookingService = bookingService;
    }

    @PostMapping("/add-bike")
    public String addBike(
            @RequestBody AddBikeReq request) {

        return ownerService.addBike(request);
    }

    @GetMapping("/my-bikes/{ownerId}")
    public List<Bike> getMyBikes(
            @PathVariable Long ownerId) {

        return ownerService.getMyBikes(ownerId);
    }

    @DeleteMapping("/delete-bike/{bikeId}")
    public String deleteBike(
            @PathVariable Long bikeId) {

        return ownerService.deleteBike(bikeId);
    }

    @GetMapping("/requests/{ownerId}")
    public List<Booking> getRequests(
            @PathVariable Long ownerId) {

        return bookingService
                .getOwnerRequests(ownerId);
    }
}
