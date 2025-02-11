package com.example.demo.service;

import com.example.demo.dto.item.ItemRequest;
import com.example.demo.dto.item.ItemResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Item;
import com.example.demo.model.Spending;
import com.example.demo.repository.ItemRepo;
import com.example.demo.repository.SpendingRepo;
import com.example.demo.utils.mapper.ItemMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepo itemRepository;
    private final SpendingRepo spendingRepository;

    public ItemService(ItemRepo itemRepository, SpendingRepo spendingRepository) {
        this.itemRepository = itemRepository;
        this.spendingRepository = spendingRepository;
    }

    @Transactional
    public ItemResponse save(ItemRequest itemRequest, Long spendingId) {

        Item itemToSave = new Item(
                itemRequest.itemName(),
                itemRequest.pricePerUnit(),
                itemRequest.units(),
                itemRequest.pricePerUnit() * itemRequest.units(),
                itemRequest.category(),
                spendingRepository.findById(spendingId)
                        .orElseThrow(() -> new AuthException.NotFoundException(
                                "Spending not found with id: " + spendingId))
        );

        return ItemMapper.entityToDto(itemRepository.save(itemToSave));
    }

    public Item findById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("Item not found with id: " + id));
    }

    @Transactional
    public void delete(Long id) {
        Item item = findById(id);
        itemRepository.delete(item);
    }

    public ItemResponse findResponseById(Long id) {
        return ItemMapper.entityToDto(findById(id));
    }

    public List<ItemResponse> getAllItemsResponse() {
        return ItemMapper.entityListToDto(itemRepository.findAll());
    }

    public List<ItemResponse> getItemsBySpendingId(Long spendingId) {
        List<Item> items = itemRepository.findBySpending_SpendingsId(spendingId);
        if (items.isEmpty()) {
            throw new AuthException.NotFoundException("No items found for spending id: " + spendingId);
        }
        return ItemMapper.entityListToDto(items);
    }
}