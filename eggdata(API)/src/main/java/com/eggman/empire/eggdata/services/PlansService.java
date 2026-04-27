package com.eggman.empire.eggdata.services;

import com.eggman.empire.eggdata.exceptions.BusinessException;
import com.eggman.empire.eggdata.exceptions.ResourceNotFoundException;
import com.eggman.empire.eggdata.models.Plans;
import com.eggman.empire.eggdata.models.User;
import com.eggman.empire.eggdata.models.enums.UserRank;
import com.eggman.empire.eggdata.repositories.PlansRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlansService {

    private final PlansRepository plansRepository;
    private final UserService userService;

    private void checkAuthority(Plans plan, Long requesterId, String action) {
        User user = userService.getUserById(requesterId);

        // EGG_MASTER ignora qualquer bloqueio
        if (user.getRank() == UserRank.EGG_MASTER) return;

        // Se a ação for modificar/deletar, apenas o criador pode (se não for Egg-Master)
        if ((action.equals("UPDATE") || action.equals("DELETE")) && !plan.getCreator().getId().equals(requesterId)) {
            throw new BusinessException("Acesso Negado: Apenas o criador ou o Líder Supremo podem alterar este plano.");
        }

        // Se for apenas leitura, verifica se o rank é compatível
        if (user.getRank() != plan.getRank()) {
            throw new BusinessException("Acesso Negado: Patente insuficiente para o plano " + plan.getCodeName());
        }

        if (user.getRank().ordinal() > plan.getRank().ordinal()) {
            throw new BusinessException("Acesso Negado: Sua patente é insuficiente para ver este segredo.");
        }
    }

    public Plans addPlan(Plans plan) {
        // Garante que a data de criação seja agora, independente do que venha no JSON
        plan.setCreationDate(LocalDate.now());
        return plansRepository.save(plan);
    }

    public Page<Plans> getPlansForUser(Long userId, Pageable pageable) {
        User user = userService.getUserById(userId);

        // Se for o próprio Dr. Eggman (Rank S ou EGG-MASTER), vê tudo.
        if (user.getRank() == UserRank.EGG_MASTER) {
            return plansRepository.findAll(pageable);
        }

        List<UserRank> accessibleRanks = Arrays.stream(UserRank.values())
                .filter(r -> r.ordinal() >= user.getRank().ordinal())
                .toList();

        // Caso contrário, ele só vê planos que condizem com o seu Rank
        // Precisamos criar esse metodo no Repository
        return plansRepository.findByRankIn(accessibleRanks, pageable);
    }

    public Plans getPlanById(Long id, Long requesterId) {
        Plans plan = findPlanById(id);
        checkAuthority(plan, requesterId, "READ");
        return plan;
    }

    public Page<Plans> getPlans(Pageable pageable) {
        return plansRepository.findAll(pageable);
    }

    public Plans updatePlan(Long id, Plans newPlan, Long requesterId) {
        Plans existingPlan = findPlanById(id);
        checkAuthority(existingPlan, requesterId, "UPDATE");

        newPlan.setId(id);
        newPlan.setCreationDate(existingPlan.getCreationDate());
        return plansRepository.save(newPlan);
    }

    public void deletePlan(Long id, Long requesterId) {
        Plans plan = findPlanById(id);
        checkAuthority(plan, requesterId, "DELETE");
        plansRepository.deleteById(id);
    }

    private Plans findPlanById(Long id) {
        return plansRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("O Plano maligno com o id " + id + " não existe nos registros.")
        );
    }
}