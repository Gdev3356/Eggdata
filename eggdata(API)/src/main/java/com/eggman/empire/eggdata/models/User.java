package com.eggman.empire.eggdata.models;

import com.eggman.empire.eggdata.models.enums.UserRank;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TB_USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Por favor, informe um nome de usuário.")
    @Column(nullable = false)
    private String userName;

    @NotBlank(message = "A senha não pode estar em branco.")
    @Size(min = 6, message = "Sua senha precisa ter pelo menos 6 caracteres.")
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotNull(message = "Selecione um rank para o usuário.") // Enum usa NotNull em vez de NotBlank
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRank rank;

    @Column(updatable = false)
    private LocalDate creationDate = LocalDate.now();
}