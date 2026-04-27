package com.eggman.empire.eggdata.controllers;

import com.eggman.empire.eggdata.models.Opponent;
import com.eggman.empire.eggdata.services.OpponentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/opponents")
@RequiredArgsConstructor
public class OpponentController {

    private final OpponentService opponentService;

    @GetMapping
    public ResponseEntity<Page<Opponent>> getAll(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(opponentService.getOpponents(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Opponent> getById(@PathVariable Long id) {
        return ResponseEntity.ok(opponentService.getOpponentById(id));
    }

    @PostMapping
    public ResponseEntity<Opponent> create(@Valid @RequestBody Opponent opponent) {
        Opponent saved = opponentService.addOpponent(opponent);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Opponent> update(@PathVariable Long id, @Valid @RequestBody Opponent opponent) {
        return ResponseEntity.ok(opponentService.updateOpponent(id, opponent));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Opponent> updateStatus(
            @PathVariable Long id,
            @RequestBody String newStatus) {
        String cleanStatus = newStatus.replace("\"", "");
        return ResponseEntity.ok(opponentService.changeStatus(id, cleanStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        opponentService.deleteOpponent(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}