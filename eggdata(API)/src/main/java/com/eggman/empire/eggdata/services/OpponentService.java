package com.eggman.empire.eggdata.services;

import com.eggman.empire.eggdata.exceptions.BusinessException;
import com.eggman.empire.eggdata.exceptions.ResourceNotFoundException;
import com.eggman.empire.eggdata.models.Opponent;
import com.eggman.empire.eggdata.models.enums.OpponentStatus;
import com.eggman.empire.eggdata.repositories.OpponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OpponentService {

    private final OpponentRepository opponentRepository;

    @Autowired
    public OpponentService(OpponentRepository opponentRepository){
        this.opponentRepository = opponentRepository;
    }

    public Opponent addOpponent(Opponent opponent){
        return opponentRepository.save(opponent);
    }

    public Page<Opponent> getOpponents(Pageable pageable){
        return opponentRepository.findAll(pageable);
    }

    public Opponent getOpponentById(Long id){
        return findOpponentById(id);
    }

    public Opponent updateOpponent(Long id, Opponent newOpponent) {
        findOpponentById(id);
        newOpponent.setId(id);
        return opponentRepository.save(newOpponent);
    }

    public void deleteOpponent(Long id) {
        findOpponentById(id);
        opponentRepository.deleteById(id);
    }

    private Opponent findOpponentById(Long id) {
        return opponentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("O Oponente com o id " + id + " não foi encontrado nos registros do Império Eggman!")
        );
    }

    public Opponent changeStatus(Long id, String statusName) {
        Opponent opponent = opponentRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Oponente não encontrado."));

        // Converte a String para o Enum (dispara erro se o status for inválido)
        opponent.setStatus(OpponentStatus.valueOf(statusName.toUpperCase()));

        return opponentRepository.save(opponent);
    }
}