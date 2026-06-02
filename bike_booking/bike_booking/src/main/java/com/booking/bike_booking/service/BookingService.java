package com.booking.bike_booking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.booking.bike_booking.dto.BookBikeReq;
import com.booking.bike_booking.model.Bike;
import com.booking.bike_booking.model.Booking;
import com.booking.bike_booking.model.User;
import com.booking.bike_booking.repository.BikeRepository;
import com.booking.bike_booking.repository.BookingRepository;
import com.booking.bike_booking.repository.UserRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            BikeRepository bikeRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.bikeRepository = bikeRepository;
    }

    public List<Booking> getUserHistory(
            Long userId) {

        return bookingRepository
                .findByUserId(userId);
    }

    public String bookBike(
            BookBikeReq request) {

        User user
                = userRepository
                        .findById(
                                request.getUserId())
                        .orElse(null);

        Bike bike
                = bikeRepository
                        .findById(
                                request.getBikeId())
                        .orElse(null);

        System.out.println(
                "User ID = "
                + request.getUserId());

        System.out.println(
                "Bike ID = "
                + request.getBikeId());

        System.out.println(
                "User = " + user);

        System.out.println(
                "Bike = " + bike);

        if (user == null || bike == null) {
            return "Invalid Data";
        }

        Booking booking
                = new Booking();

        booking.setUser(user);

        booking.setBike(bike);

        booking.setStatus("PENDING");

        booking.setBookingDate(
                LocalDateTime.now());

        bookingRepository.save(
                booking);

        return "Booking Request Sent";
    }

    public String acceptBooking(Long bookingId) {

        Booking booking
                = bookingRepository
                        .findById(bookingId)
                        .orElse(null);

        if (booking == null) {
            return "Booking Not Found";
        }

        booking.setStatus("ACCEPTED");

        Bike bike = booking.getBike();

        bike.setStatus("BOOKED");

        bikeRepository.save(bike);

        bookingRepository.save(booking);

        return "Booking Accepted";
    }

    public List<Booking>
            getOwnerRequests(Long ownerId) {

        return bookingRepository
                .findByBikeOwnerId(ownerId);
    }
}
