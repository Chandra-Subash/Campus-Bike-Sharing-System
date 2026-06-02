package com.booking.bike_booking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.booking.bike_booking.dto.AddBikeReq;
import com.booking.bike_booking.model.Bike;
import com.booking.bike_booking.model.User;
import com.booking.bike_booking.repository.BikeRepository;
import com.booking.bike_booking.repository.UserRepository;

@Service
public class OwnerService {

    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;

    public List<Bike> getAvailableBikes() {

        return bikeRepository
                .findByStatus("AVAILABLE");
    }

    public OwnerService(
            BikeRepository bikeRepository,
            UserRepository userRepository) {

        this.bikeRepository = bikeRepository;
        this.userRepository = userRepository;
    }

    public String addBike(AddBikeReq request) {

        User owner = userRepository
                .findById(request.getOwnerId())
                .orElse(null);

        if (owner == null) {
            return "Owner not found";
        }

        List<Bike> ownerBikes
                = bikeRepository.findByOwnerId(
                        request.getOwnerId());

        if (ownerBikes.size() >= 3) {
            return "Maximum 3 bikes allowed";
        }

        Bike bike = new Bike();

        bike.setBikeNumber(
                request.getBikeNumber());

        bike.setModel(
                request.getModel());

        bike.setLocation(
                request.getLocation());

        bike.setPricePerHour(
                request.getPricePerHour());

        bike.setStatus("AVAILABLE");

        bike.setOwner(owner);

        bikeRepository.save(bike);

        return "Bike Added Successfully";
    }

    public List<Bike> getMyBikes(Long ownerId) {

        return bikeRepository
                .findByOwnerId(ownerId);
    }

    public String deleteBike(Long bikeId) {

        bikeRepository.deleteById(bikeId);

        return "Bike Deleted Successfully";
    }
}
