package com.example.demo.model;

import com.example.demo.model.enums.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(nullable = false)
    @Schema(description = "The total price of the item")
    float totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The ctegory of the item")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spendings_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    @Schema(description = "The spending entry to which the item belongs")
    private Spending spending;

    public Item(String itemName, float pricePerUnit, int units, float totalPrice, Category category, Spending spending) {
        this.itemName = itemName;
        this.pricePerUnit = pricePerUnit;
        this.units = units;
        this.totalPrice = totalPrice;
        this.category = category;
        this.spending = spending;
    }
}
