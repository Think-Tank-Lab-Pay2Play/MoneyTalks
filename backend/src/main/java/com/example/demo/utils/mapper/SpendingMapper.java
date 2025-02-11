package com.example.demo.utils.mapper;


import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.model.Spending;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class SpendingMapper {

    public static SpendingResponse entityToDto(Spending spending) {
        return new SpendingResponse(
                spending.getSpendingsId(),
                spending.getUser().getId(),
                spending.getCompanyName(),
                spending.getTotalPrice(),
                spending.getDate(),
                spending.getProducts() != null ? ItemMapper.entityListToDto(spending.getProducts()) : null,
                spending.getImageName(),
                spending.getImageBase64(),
                spending.getDescription()
        );
    }

    public static List<SpendingResponse> entityListToDto(List<Spending> spendings) {
        return spendings.stream()
                .map(SpendingMapper::entityToDto)
                .collect(Collectors.toList());
    }
}
