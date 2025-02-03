package com.example.demo.service;

import com.example.demo.dto.item.ItemRequest;
import com.example.demo.dto.item.ItemResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Item;
import com.example.demo.model.Spending;
import com.example.demo.model.User;
import com.example.demo.repository.ItemRepo;
import com.example.demo.repository.SpendingRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.utils.mapper.ItemMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepo itemRepository;
    private final UserRepo userRepository;
    private final SpendingRepo spendingRepository;

    public ItemService(ItemRepo itemRepository, UserRepo userRepository, SpendingRepo spendingRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.spendingRepository = spendingRepository;
    }

    @Transactional
    public ItemResponse save(ItemRequest itemRequest) {
        User user = userRepository.findById(itemRequest.userId()).orElseThrow(()->new AuthException.NotFoundException("User not found with id: " + itemRequest.userId()));
        Spending spending = spendingRepository.findById(itemRequest.spendingId()).orElseThrow(()->new AuthException.NotFoundException("Spending not found with id: " + itemRequest.spendingId()));
        Item itemToSave = new Item(
                itemRequest.itemName(),
                itemRequest.pricePerUnit(),
                itemRequest.units(),
                itemRequest.category(),
                user,
                spending
        );
        return ItemMapper.entityToDto(itemRepository.save(itemToSave));
    }

    public Item findById(Long id) {
        return itemRepository.findById(id).orElseThrow(()->new AuthException.NotFoundException("Item not found with id: " + id));
    }

    @Transactional
    public void delete(Long id){
        Item item=findById(id);
        itemRepository.delete(item);
    }

    public ItemResponse findResponseById(Long id){
        return ItemMapper.entityToDto(findById(id));
    }

    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    public List<ItemResponse> getAllItemsResponse(){
        return ItemMapper.entityListToDto(getAllItems());
    }

    public List<ItemResponse> getItemsByUserId(Long userId) {
        return ItemMapper.entityListToDto(itemRepository.findByUserId(userId));
    }

    public List<ItemResponse> getItemsBySpendingId(Long spendingId) {
        return ItemMapper.entityListToDto(itemRepository.findBySpendingId(spendingId));
    }

}
