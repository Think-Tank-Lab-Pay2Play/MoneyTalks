package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "app_spending")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The unique ID of the spendings entry")
    private Long spendingsId;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    @Schema(description = "The user who made the spending")
    private User user;

    @Column(nullable=false, length=100)
    @Schema(description = "The name of the company of the spending")
    private String companyName;

    @OneToMany(mappedBy = "spending", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Schema(description = "List of items purchased in the spending")
    private List<Item> products;

    @Column(nullable = false)
    @Schema(description = "The total price of the spending")
    private float totalPrice;

    @Column(nullable = false)
    @Schema(description = "The date when the spending occurred")
    private LocalDate date;

    @Column(length = 255)
    @Schema(description = "Path to the image of the receipt")
    private String image;

    @Column(length = 255)
    @Schema(description = "Description about the spending")
    private String description;

    public Spending(User user, String companyName, List<Item> products, float totalPrice, LocalDate date, String image, String description) {
        this.user = user;
        this.companyName = companyName;
        this.products = products;
        this.totalPrice = totalPrice;
        this.date = date;
        this.image = image;
        this.description = description;
    }
}
