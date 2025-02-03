package com.example.demo.service;

import com.example.demo.dto.spendings.SpendingRequest;
import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Spending;
import com.example.demo.model.User;
import com.example.demo.repository.SpendingRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.utils.mapper.SpendingMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpendingService {

    private final SpendingRepo spendingRepo;
    private final UserRepo userRepo;

    public SpendingService(SpendingRepo spendingRepo, UserRepo userRepo) {
        this.spendingRepo = spendingRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public SpendingResponse save(SpendingRequest spendingRequest) {
        User userById = userRepo.findById(spendingRequest.userId()).orElseThrow(() -> new AuthException.NotFoundException("User not found with id: " + spendingRequest.userId()));
        Spending spendingToSave = new Spending(
                userById,
                spendingRequest.companyName(),
                spendingRequest.products(),
                spendingRequest.totalPrice(),
                spendingRequest.date(),
                spendingRequest.image(),
                spendingRequest.description()
        );
        return SpendingMapper.entityToDto(spendingRepo.save(spendingToSave));
    }

    public Spending findById(long id) {
        return spendingRepo.findById(id).orElseThrow(() -> new AuthException.NotFoundException("Spending not found with id: " + id));
    }

    @Transactional
    public void delete(Long id) {
        Spending spending = findById(id);
        spendingRepo.delete(spending);
    }

    public SpendingResponse findResponseById(Long id) {
        return SpendingMapper.entityToDto(findById(id));
    }

    public List<Spending> getAllSpendings() {
        return spendingRepo.findAll();
    }

    public List<SpendingResponse> getAllSpendingResponses() {
        return SpendingMapper.entityListToDto(getAllSpendings());
    }

    public List<SpendingResponse> getSpendingsByUserId(Long userId) {
        if(!userRepo.existsById(userId)) {
            throw new AuthException.NotFoundException("User not found with id: " + userId);
        }
        return SpendingMapper.entityListToDto(spendingRepo.findByUserId(userId));
    }
}
