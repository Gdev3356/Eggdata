package com.eggman.empire.eggdata.repositories;

import com.eggman.empire.eggdata.models.Opponent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpponentRepository extends JpaRepository<Opponent, Long> {
    long countByOpponent(Opponent opponent);
}