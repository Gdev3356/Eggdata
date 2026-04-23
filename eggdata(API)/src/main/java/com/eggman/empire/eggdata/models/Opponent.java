package com.eggman.empire.eggdata.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TB_OPPONENT")
public class Opponent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String species;

    @Column(nullable = false)
    private String powers;

    private Integer age;

    private String gender;

    private String personality;

    private String friends;

    private String weakness;

    @Column(nullable = false)
    private LocalDate registerDate = LocalDate.now();
}
