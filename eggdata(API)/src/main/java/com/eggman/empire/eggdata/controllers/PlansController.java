package com.eggman.empire.eggdata.controllers;

import com.eggman.empire.eggdata.models.Plans;
import com.eggman.empire.eggdata.services.PlansService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plans")
@RequiredArgsConstructor
public class PlansController {

    private final PlansService plansService;

    @GetMapping
    public ResponseEntity<Page<Plans>> getAll(
            @RequestHeader("X-User-Id") Long userId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(plansService.getPlansForUser(userId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plans> getById(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long requesterId) { // Captura quem está pedindo

        return ResponseEntity.ok(plansService.getPlanById(id, requesterId));
    }

    @PostMapping
    public ResponseEntity<Plans> create(@Valid @RequestBody Plans plan) {
        Plans saved = plansService.addPlan(plan);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plans> update(
            @PathVariable Long id,
            @Valid @RequestBody Plans plan,
            @RequestHeader("X-User-Id") Long requesterId) {
        return ResponseEntity.ok(plansService.updatePlan(id, plan, requesterId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long requesterId) {
        plansService.deletePlan(id, requesterId);
        return ResponseEntity.noContent().build();
    }
}