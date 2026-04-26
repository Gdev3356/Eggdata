package com.eggman.empire.eggdata.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    private String password;

    @NotBlank(message = "Selecione um rank para o usuário.")
    @Column(nullable = false)
    private String rank;

    private LocalDate creationDate = LocalDate.now();
}