package com.example.demo.model;

import com.example.demo.model.enums.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "app_items")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The unique ID of the item")
    private Long itemId;

    @Column(nullable = false, length = 100)
    @Schema(description = "The name of an item")
    private String itemName;

    @Column(nullable = false)
    @Schema(description = "The price per unit of the item")
    private float pricePerUnit;

    @Column(nullable = false)
    @Schema(description = "The number of units of the item")
    private int units;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The ctegory of the item")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    @Schema(description = "The user who purchased the item")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spendings_id", nullable = false)
    @Schema(description = "The spendings entry to which the item belongs")
    private Spending spending;

    public Item(String itemName, float pricePerUnit, int units, Category category, User user, Spending spending) {
        this.itemName = itemName;
        this.pricePerUnit = pricePerUnit;
        this.units = units;
        this.category = category;
        this.user = user;
        this.spending = spending;
    }
}
