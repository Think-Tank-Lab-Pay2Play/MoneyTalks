package com.example.demo.service;

import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.exceptions.AuthException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final InMemoryUserDetailsManager inMemoryUserDetailsManager;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder, InMemoryUserDetailsManager inMemoryUserDetailsManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.inMemoryUserDetailsManager = inMemoryUserDetailsManager;
    }

    public UserResponse signup(UserRequest userRequest) throws AuthException {
        if (userService.checkIfEmailExists(userRequest.email())) {
            throw new AuthException("Username already exists");
        }
        UserResponse userResponse = userService.save(userRequest);
        UserDetails userDetails = User.withUsername(userRequest.email())
                .password(passwordEncoder.encode(userRequest.password()))
                .build();
        inMemoryUserDetailsManager.createUser(userDetails);
        return userResponse;
    }
}