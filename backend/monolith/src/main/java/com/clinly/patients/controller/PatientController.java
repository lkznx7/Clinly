package com.clinly.patients.controller;

import com.clinly.patients.dto.CreatePatientDTO;
import com.clinly.patients.dto.PatientResponseDTO;
import com.clinly.patients.dto.UpdatePatientDTO;
import com.clinly.patients.service.PatientService;
import com.clinly.shared.dto.PaginatedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patients")
@Tag(name = "Pacientes", description = "Endpoints de gestão de pacientes")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    @Operation(summary = "Cadastrar paciente")
    public ResponseEntity<PatientResponseDTO> create(@Valid @RequestBody CreatePatientDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.create(dto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar paciente por ID")
    public ResponseEntity<PatientResponseDTO> findById(@PathVariable java.util.UUID id) {
        return ResponseEntity.ok(patientService.findById(id));
    }

    @GetMapping
    @Operation(summary = "Listar pacientes")
    public ResponseEntity<PaginatedResponse<PatientResponseDTO>> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        return ResponseEntity.ok(patientService.findAll(search, status, pageable));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar paciente")
    public ResponseEntity<PatientResponseDTO> update(
            @PathVariable java.util.UUID id,
            @Valid @RequestBody UpdatePatientDTO dto) {
        return ResponseEntity.ok(patientService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir paciente")
    public ResponseEntity<Void> delete(@PathVariable java.util.UUID id) {
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
