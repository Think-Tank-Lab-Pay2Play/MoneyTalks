package com.example.demo.utils.mapper;

import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.model.Spending;

import java.util.List;
import java.util.stream.Collectors;

public class SpendingMapper {

    public static SpendingResponse entityToDto(Spending spending) {
        return new SpendingResponse(
                spending.getSpendingsId(),
                spending.getUser().getId(),
                spending.getCompanyName(),
                spending.getProducts() != null ? ItemMapper.entityListToDto(spending.getProducts()) : null,
                spending.getTotalPrice(),
                spending.getDate(),
                spending.getImage(),
                spending.getDescription()
        );
    }

    public static List<SpendingResponse> entityListToDto(List<Spending> spendings) {
        return spendings.stream().map(SpendingMapper::entityToDto).collect(Collectors.toList());
    }
}
