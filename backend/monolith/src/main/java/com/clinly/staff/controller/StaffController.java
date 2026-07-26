package com.clinly.staff.controller;

import com.clinly.staff.dto.CreateStaffDTO;
import com.clinly.staff.dto.StaffResponseDTO;
import com.clinly.staff.dto.UpdateStaffDTO;
import com.clinly.staff.service.StaffService;
import com.clinly.shared.dto.PaginatedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/staff")
@Tag(name = "Equipe", description = "Endpoints de gestão de equipe")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    @Operation(summary = "Listar equipe")
    public ResponseEntity<PaginatedResponse<StaffResponseDTO>> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        return ResponseEntity.ok(staffService.findAll(search, role, status, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar membro por ID")
    public ResponseEntity<StaffResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(staffService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Adicionar membro")
    public ResponseEntity<StaffResponseDTO> create(@Valid @RequestBody CreateStaffDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(staffService.create(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar membro")
    public ResponseEntity<StaffResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateStaffDTO dto) {
        return ResponseEntity.ok(staffService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover membro")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        staffService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
