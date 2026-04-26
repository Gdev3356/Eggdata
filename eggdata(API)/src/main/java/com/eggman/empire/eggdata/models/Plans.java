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
@Table(name = "TB_PLANS")
public class Plans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Informe o codinome do plano.")
    @Column(nullable = false)
    private String codeName;

    @NotBlank(message = "Defina o nível de ameaça (rank) do plano.")
    @Column(nullable = false)
    private String rank;

    private LocalDate creationDate = LocalDate.now();

    @NotNull(message = "Todo plano deve ter um criador (Usuário)!")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User creator;

    @NotNull(message = "Todo plano deve ter um alvo principal (Oponente).")
    @ManyToOne
    @JoinColumn(name = "opponent_id", nullable = false)
    private Opponent target;
}