package com.booking.bike_booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booking.bike_booking.model.Bike;

public interface BikeRepository
        extends JpaRepository<Bike, Long> {

    List<Bike> findByOwnerId(Long ownerId);

    List<Bike> findByStatus(String Status);
}
