package com.example.demo.utils.mapper;

import com.example.demo.dto.item.ItemResponse;
import com.example.demo.model.Item;

import java.util.List;
import java.util.stream.Collectors;

public class ItemMapper {
    public static ItemResponse entityToDto(Item item) {
        return new ItemResponse(
                item.getItemId(),
                item.getItemName(),
                item.getPricePerUnit(),
                item.getUnits(),
                item.getTotalPrice(),
                item.getCategory(),
                item.getSpending().getSpendingsId()
        );
    }

    public static List<ItemResponse> entityListToDto(List<Item> items) {
        return items.stream().map(ItemMapper::entityToDto).collect(Collectors.toList());
    }
}
