package com.example.demo.repository;

import com.example.demo.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SpendingRepo extends JpaRepository<Spending, Long> {
    List<Spending> findByUserId(Long userId);
}
