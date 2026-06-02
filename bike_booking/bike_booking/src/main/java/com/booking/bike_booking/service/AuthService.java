package com.booking.bike_booking.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.booking.bike_booking.dto.LoginRequest;
import com.booking.bike_booking.dto.LoginResponse;
import com.booking.bike_booking.dto.RegisterRequest;
import com.booking.bike_booking.model.User;
import com.booking.bike_booking.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(
                request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {

            return new LoginResponse(
                    null,
                    null,
                    null,
                    "User Not Found");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return new LoginResponse(
                    null,
                    null,
                    null,
                    "Invalid Password");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getRole(),
                "Login Success");
    }
}
