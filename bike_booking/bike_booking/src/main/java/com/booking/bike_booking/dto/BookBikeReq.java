package com.booking.bike_booking.dto;

public class BookBikeReq {

    private Long userId;
    private Long bikeId;

    public BookBikeReq() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBikeId() {
        return bikeId;
    }

    public void setBikeId(Long bikeId) {
        this.bikeId = bikeId;
    }
}
