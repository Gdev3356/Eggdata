package com.eggman.empire.eggdata.repositories;

import com.eggman.empire.eggdata.models.Plans;
import com.eggman.empire.eggdata.models.enums.UserRank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlansRepository extends JpaRepository<Plans, Long> {
    // Busca planos compatíveis com o rank do usuário
    Page<Plans> findByRankIn(List<UserRank> ranks, Pageable pageable);

    // Busca planos criados por um usuário específico
    Page<Plans> findByCreatorId(Long userId, Pageable pageable);
}