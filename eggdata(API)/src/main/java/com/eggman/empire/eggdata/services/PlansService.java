package com.eggman.empire.eggdata.services;

import com.eggman.empire.eggdata.exceptions.ResourceNotFoundException;
import com.eggman.empire.eggdata.models.Plans;
import com.eggman.empire.eggdata.repositories.PlansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PlansService {

    private final PlansRepository plansRepository;

    @Autowired
    public PlansService(PlansRepository plansRepository) {
        this.plansRepository = plansRepository;
    }

    public Plans addPlan(Plans plan) {
        return plansRepository.save(plan);
    }

    public Page<Plans> getPlans(Pageable pageable) {
        return plansRepository.findAll(pageable);
    }

    public Plans getPlanById(Long id) {
        return findPlanById(id);
    }

    public Plans updatePlan(Long id, Plans newPlan) {
        findPlanById(id);
        newPlan.setId(id);
        return plansRepository.save(newPlan);
    }

    public void deletePlan(Long id) {
        findPlanById(id);
        plansRepository.deleteById(id);
    }

    private Plans findPlanById(Long id) {
        return plansRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("O Plano maligno com o id " + id + " não foi encontrado nos arquivos do Dr. Eggman!")
        );
    }
}