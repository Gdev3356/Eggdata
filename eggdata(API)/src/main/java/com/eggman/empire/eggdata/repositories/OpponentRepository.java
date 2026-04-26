package com.eggman.empire.eggdata.repositories;

import com.eggman.empire.eggdata.models.Opponent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpponentRepository extends JpaRepository<Opponent, Long> {

    Page<Opponent> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Opponent> findBySpeciesIgnoreCase(String species, Pageable pageable);

    Page<Opponent> findByAge(Integer age, Pageable pageable);

}