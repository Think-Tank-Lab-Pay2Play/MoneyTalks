package com.example.demo.service;

import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.dto.userUpdate.PasswordChangeRequest;
import com.example.demo.dto.userUpdate.UserProfileRequest;
import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.utils.mapper.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse save(UserRequest userRequest) {
        String encodedPassword = passwordEncoder.encode(userRequest.password());

        User userToSave = new User(
                userRequest.firstName(),
                userRequest.lastName(),
                userRequest.email(),
                encodedPassword
        );
        return UserMapper.entityToDto(userRepository.save(userToSave));
    }

    @Transactional
    public void delete(Long id){
        User user = findById(id);
        userRepository.delete(user);
    }

    @Transactional
    public UserResponse updateProfile(Long id, UserProfileRequest profileRequest) {
        User user = findById(id);
        user.setFirstName(profileRequest.firstName());
        user.setLastName(profileRequest.lastName());

        if (!user.getEmail().equals(profileRequest.email())) {
            if (checkIfEmailExists(profileRequest.email())) {
                throw new AlreadyExistsException("Email already exists: " + profileRequest.email());
            }
            user.setEmail(profileRequest.email());
        }

        return UserMapper.entityToDto(userRepository.save(user));
    }

    @Transactional
    @PreAuthorize("#email == authentication.principal.username")
    public void changePassword(String email, PasswordChangeRequest passwordChangeRequest) {
        User user = findByEmail(email);

        boolean matches = passwordEncoder.matches(passwordChangeRequest.oldPassword(), user.getPassword());

        if (!matches) {
            throw new AuthException.InvalidCredentialsException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(passwordChangeRequest.newPassword()));
        userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("User not found with id: " + id));
    }

    public UserResponse findResponseById(Long id) {
        return UserMapper.entityToDto(findById(id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserResponse> getAllUserResponses() {
        return UserMapper.entityListToDto(getAllUsers());
    }

    public boolean checkIfEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException.NotFoundException("User not found with email: " + email));
    }

    public UserResponse findResponseByEmail(String email) {
        return UserMapper.entityToDto(findByEmail(email));
    }
}
