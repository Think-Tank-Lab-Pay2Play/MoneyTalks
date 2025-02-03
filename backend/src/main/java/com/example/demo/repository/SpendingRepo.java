package com.example.demo.repository;

import com.example.demo.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpendingRepo extends JpaRepository<Spending, Long> {
    List<Spending> findByUserId(Long userId);
}
