package com.clinly.clinics.controller;

import com.clinly.clinics.dto.ClinicResponseDTO;
import com.clinly.clinics.dto.CreateClinicDTO;
import com.clinly.clinics.dto.UpdateClinicDTO;
import com.clinly.clinics.service.ClinicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clinics")
@Tag(name = "Clínicas", description = "Endpoints de gestão de clínicas")
public class ClinicController {

    private final ClinicService clinicService;

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @PostMapping
    @Operation(summary = "Cadastrar clínica")
    public ResponseEntity<ClinicResponseDTO> create(@Valid @RequestBody CreateClinicDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clinicService.create(dto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar clínica por ID")
    public ResponseEntity<ClinicResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(clinicService.findById(id));
    }

    @GetMapping
    @Operation(summary = "Listar clínicas")
    public ResponseEntity<List<ClinicResponseDTO>> findAll() {
        return ResponseEntity.ok(clinicService.findAll());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar clínica")
    public ResponseEntity<ClinicResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateClinicDTO dto) {
        return ResponseEntity.ok(clinicService.update(id, dto));
    }

    @PatchMapping("/{id}/toggle-active")
    @Operation(summary = "Ativar/Inativar clínica")
    public ResponseEntity<ClinicResponseDTO> toggleActive(@PathVariable UUID id) {
        return ResponseEntity.ok(clinicService.toggleActive(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir clínica")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        clinicService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
