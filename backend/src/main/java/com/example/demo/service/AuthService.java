package com.example.demo.service;

import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.exceptions.AuthException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService,
                       PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse signup(UserRequest userRequest) throws AuthException {

        if (userService.checkIfEmailExists(userRequest.email())) {
            throw new AuthException("Acest email este deja folosit pentru un cont!");
        }

        UserResponse userResponse = userService.save(userRequest);

        return userResponse;
    }
}