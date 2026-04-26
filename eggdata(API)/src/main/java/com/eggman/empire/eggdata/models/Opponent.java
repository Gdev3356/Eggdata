package com.eggman.empire.eggdata.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "O nome do alvo/oponente é obrigatório para os registros do Império.")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "A espécie do oponente deve ser informada (ex: Ouriço, Raposa).")
    @Column(nullable = false)
    private String species;

    @NotBlank(message = "As habilidades e poderes devem ser listados.")
    @Column(nullable = false)
    private String powers;

    @NotNull(message = "A idade do oponente não pode ser nula.")
    private Integer age;

    // Atributos opcionais
    private String gender;

    private String personality;

    private String friends;

    private String weakness;

    @Column(nullable = false)
    private LocalDate registerDate = LocalDate.now();
}