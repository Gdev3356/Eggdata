package com.eggman.empire.eggdata.models;

import com.eggman.empire.eggdata.models.enums.UserRank;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @NotBlank(message = "Descreva os detalhes da operação maligna.")
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Defina o nível de ameaça (rank) do plano.")
    @Enumerated(EnumType.STRING)
    private UserRank rank;

    @NotNull(message = "Todo plano deve ter um criador.")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User creator;

    //Adicionado para podermos ter mais de um oponente por plano.
    @ManyToMany
    @JoinTable(
            name = "TB_PLAN_TARGETS",
            joinColumns = @JoinColumn(name = "plan_id"),
            inverseJoinColumns = @JoinColumn(name = "opponent_id")
    )
    private List<Opponent> targets = new ArrayList<>();

    private LocalDate creationDate = LocalDate.now();
}