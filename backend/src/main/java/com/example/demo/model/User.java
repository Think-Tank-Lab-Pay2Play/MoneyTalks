package com.example.demo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "app_users")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the user")
    private Long id;

    @Column(nullable = false, length = 32)
    @Schema(description = "The first name of the user")
    private String firstName;

    @Column(nullable = false, length = 32)
    @Schema(description = "The last name of the user")
    private String lastName;

    @Column(nullable = false, length = 64)
    @Schema(description = "The email of the user")
    private String email;

    @Column(nullable = false, length = 64)
    @Schema(description = "The password of the user")
    private String password;

    @Schema(description = "The list of spendings of the user")
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Spending> spendings;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(description = "The list of spending limits of the user")
    private List<SpendingLimit> spendingLimits;

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }


}
