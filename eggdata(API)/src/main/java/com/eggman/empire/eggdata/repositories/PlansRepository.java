package com.eggman.empire.eggdata.repositories;

import com.eggman.empire.eggdata.models.Plans;
import com.eggman.empire.eggdata.models.Plans;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlansRepository extends JpaRepository<Plans, Long> {
    long countByPlans(Plans plans);
}