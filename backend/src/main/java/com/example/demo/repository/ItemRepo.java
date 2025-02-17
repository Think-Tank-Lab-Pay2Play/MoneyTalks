package com.example.demo.repository;

import com.example.demo.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ItemRepo extends JpaRepository<Item, Long> {
    List<Item> findBySpending_SpendingsId(Long spendingsId);
}