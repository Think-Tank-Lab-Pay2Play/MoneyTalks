package com.example.demo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "app_spending_limit")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SpendingLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "the id of the spending limit")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "the limit for the user")
    private float spendingLimit;

    @Column(nullable = false)
    @Schema(description = "when the spending limit starts")
    private LocalDate startDate;

    @Column(nullable = false)
    @Schema(description = "when the spending limit ends")
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    @Schema(description = "The user who has the spending limit")
    private User user;

    public SpendingLimit(float spendingLimit, LocalDate startDate, LocalDate endDate, User user) {
        this.spendingLimit = spendingLimit;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
    }
}
