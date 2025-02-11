package com.example.demo.service;
import com.example.demo.dto.item.ItemRequest;
import com.example.demo.dto.spendings.SpendingRequest;
import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Spending;
import com.example.demo.repository.SpendingRepo;
import com.example.demo.utils.mapper.SpendingMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpendingService {

    private final SpendingRepo spendingRepository;
    private final UserService userService;
    private final FileStorageService fileStorageService;
    private final ItemService itemService;

    public SpendingService(SpendingRepo spendingRepository,
                           UserService userService,
                           FileStorageService fileStorageService,
                           ItemService itemService) {
        this.spendingRepository = spendingRepository;
        this.userService = userService;
        this.fileStorageService = fileStorageService;
        this.itemService = itemService;
    }

    @Transactional
    public SpendingResponse save(SpendingRequest spendingRequest) {
        Spending spending = new Spending(
                userService.findById(spendingRequest.userId()),
                spendingRequest.companyName(),
                spendingRequest.totalPrice(),
                spendingRequest.date(),
                new ArrayList<>(),
                spendingRequest.description(),
                null
        );

        Spending savedSpending = spendingRepository.save(spending);
            for (ItemRequest itemRequest : spendingRequest.products()) {
                itemService.save(itemRequest, savedSpending.getSpendingsId());
            }
        return SpendingMapper.entityToDto(
                spendingRepository.findById(savedSpending.getSpendingsId()).orElseThrow()
        );
    }

    @Transactional
    public SpendingResponse addReceiptImage(Long spendingId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Receipt image file is required");
        }

        Spending spending = findById(spendingId);
        if (spending.getImageName() != null) {
            fileStorageService.deleteFile(spending.getImageName());
        }
        String imageName = fileStorageService.storeFile(file);
        spending.setImageName(imageName);

        return SpendingMapper.entityToDto(spendingRepository.save(spending));
    }

    @Transactional
    public void deleteReceiptImage(Long spendingId) {
        Spending spending = findById(spendingId);

        if (spending.getImageName() != null) {
            fileStorageService.deleteFile(spending.getImageName());
            spending.setImageName(null);
            spendingRepository.save(spending);
        }
    }

    @Transactional
    public void delete(Long id) {
        Spending spending = findById(id);

        if (spending.getImageName() != null) {
            fileStorageService.deleteFile(spending.getImageName());
        }

        spendingRepository.delete(spending);
    }

    public Spending findById(Long id) {
        return spendingRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("Spending not found with id: " + id));
    }

    public SpendingResponse findResponseById(Long id) {
        return SpendingMapper.entityToDto(findById(id));
    }

    public List<Spending> getAllSpendings() {
        return spendingRepository.findAll();
    }

    public List<SpendingResponse> getAllSpendingResponses() {
        return SpendingMapper.entityListToDto(getAllSpendings());
    }

    public List<Spending> findByUserId(Long userId) {
        return spendingRepository.findByUserId(userId);
    }

    public List<SpendingResponse> findResponsesByUserId(Long userId) {
        return SpendingMapper.entityListToDto(findByUserId(userId));
    }
}