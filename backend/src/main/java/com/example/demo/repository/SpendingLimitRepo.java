package com.example.demo.repository;

import com.example.demo.model.SpendingLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpendingLimitRepo extends JpaRepository<SpendingLimit, Long> {

}
