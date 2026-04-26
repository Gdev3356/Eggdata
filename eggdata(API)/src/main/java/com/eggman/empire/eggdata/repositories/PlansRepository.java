package com.eggman.empire.eggdata.repositories;

import com.eggman.empire.eggdata.models.Plans;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlansRepository extends JpaRepository<Plans, Long> {

    Page<Plans> findByRankIgnoreCase(String rank, Pageable pageable);

    Page<Plans> findByCodeNameContainingIgnoreCase(String codeName, Pageable pageable);
}