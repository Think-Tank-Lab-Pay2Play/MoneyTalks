package com.example.demo.utils.mapper;

import com.example.demo.dto.item.ItemResponse;
import com.example.demo.dto.spendingLimit.SpendingLimitResponse;
import com.example.demo.model.Item;
import com.example.demo.model.SpendingLimit;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class SpendingLimitMapper {
    public static SpendingLimitResponse entityToDto(SpendingLimit spendingLimit) {
        return new SpendingLimitResponse(
                spendingLimit.getSpendingLimit(),
                spendingLimit.getStartDate(),
                spendingLimit.getEndDate()
        );
    }

    public static List<SpendingLimitResponse> entityListToDto(List<SpendingLimit> spendingLimits) {
        return spendingLimits.stream().map(SpendingLimitMapper::entityToDto).collect(Collectors.toList());
    }
}