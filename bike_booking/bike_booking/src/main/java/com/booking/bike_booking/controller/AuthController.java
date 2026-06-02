
package com.booking.bike_booking.controller;

import com.booking.bike_booking.dto.*;
import com.booking.bike_booking.dto.LoginResponse;
import com.booking.bike_booking.service.AuthService;

import org.springframework.web.bind.annotation.*;
@RestController

@RequestMapping("/auth")

@CrossOrigin("http://localhost:5173")

public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/register")

    public String register(
            @RequestBody
            RegisterRequest request) {

        return authService
                .register(request);
    }

    @PostMapping("/login")

    public LoginResponse login(
            @RequestBody
            LoginRequest request) {

        return authService.login(request);
    }
}