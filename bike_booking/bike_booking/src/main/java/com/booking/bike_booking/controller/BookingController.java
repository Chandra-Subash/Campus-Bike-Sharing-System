package com.booking.bike_booking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.bike_booking.dto.BookBikeReq;
import com.booking.bike_booking.model.Booking;
import com.booking.bike_booking.service.BookingService;

@RestController
@RequestMapping("/booking")
@CrossOrigin("http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }

    @PostMapping("/book-bike")
    public String bookBike(
            @RequestBody BookBikeReq request) {

        return bookingService
                .bookBike(request);
    }

    @GetMapping("/history/{userId}")
    public List<Booking> getHistory(
            @PathVariable Long userId) {

        return bookingService
                .getUserHistory(userId);

    }

    @PutMapping("/accept/{bookingId}")
    public String acceptBooking(
            @PathVariable Long bookingId) {

        return bookingService
                .acceptBooking(bookingId);
    }
}
