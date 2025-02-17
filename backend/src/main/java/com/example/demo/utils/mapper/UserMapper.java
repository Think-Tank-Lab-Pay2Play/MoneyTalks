package com.example.demo.utils.mapper;

import com.example.demo.dto.user.UserResponse;
import com.example.demo.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class UserMapper {
    public static UserResponse entityToDto(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getSpendings() != null ? SpendingMapper.entityListToDto(user.getSpendings()) : null,
                user.getSpendingLimits() != null ? SpendingLimitMapper.entityListToDto(user.getSpendingLimits()) : null
        );
    }

    public static List<UserResponse> entityListToDto(List<User> users) {
        return users.stream()
                .map(UserMapper::entityToDto)
                .collect(Collectors.toList());
    }
}