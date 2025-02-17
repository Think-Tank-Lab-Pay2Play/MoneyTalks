package com.example.demo.service;

import com.example.demo.dto.spendingLimit.SpendingLimitRequest;
import com.example.demo.dto.spendingLimit.SpendingLimitResponse;
import com.example.demo.model.SpendingLimit;
import com.example.demo.repository.SpendingLimitRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.utils.mapper.SpendingLimitMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpendingLimitService {

    private final SpendingLimitRepo spendingLimitRepo;
    private final UserRepo userRepo;

    public SpendingLimitService(SpendingLimitRepo spendingLimitRepo, UserRepo userRepo) {
        this.spendingLimitRepo = spendingLimitRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public SpendingLimitResponse save(SpendingLimitRequest request){
        SpendingLimit spendingLimit = new SpendingLimit(request.spendingLimit(), request.startDate(), request.endDate(), userRepo.findById(request.userId()).get());
        return SpendingLimitMapper.entityToDto(spendingLimitRepo.save(spendingLimit));
    }

    @Transactional
    public void delete(Long id){
        SpendingLimit spendingLimit = findById(id);
        spendingLimitRepo.delete(spendingLimit);
    }

    public SpendingLimit findById(Long id){
        return spendingLimitRepo.findById(id).orElseThrow(() -> new RuntimeException("Spending limit not found"));
    }

    public SpendingLimitResponse findResponseById(Long id){
        return SpendingLimitMapper.entityToDto(findById(id));
    }

    public List<SpendingLimit> getAll(){
        return spendingLimitRepo.findAll();
    }

    public List<SpendingLimitResponse> getAllResponses(){
        return SpendingLimitMapper.entityListToDto(getAll());
    }
}
