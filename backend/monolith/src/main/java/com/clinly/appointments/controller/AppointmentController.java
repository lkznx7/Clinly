package com.clinly.appointments.controller;

import com.clinly.appointments.dto.AppointmentResponseDTO;
import com.clinly.appointments.dto.CreateAppointmentDTO;
import com.clinly.appointments.dto.UpdateAppointmentDTO;
import com.clinly.appointments.service.AppointmentService;
import com.clinly.shared.dto.PaginatedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/appointments")
@Tag(name = "Consultas", description = "Endpoints de gestão de consultas")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    @Operation(summary = "Agendar consulta")
    public ResponseEntity<AppointmentResponseDTO> create(
            @Valid @RequestBody CreateAppointmentDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.create(dto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar consulta por ID")
    public ResponseEntity<AppointmentResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(appointmentService.findById(id));
    }

    @GetMapping
    @Operation(summary = "Listar consultas")
    public ResponseEntity<PaginatedResponse<AppointmentResponseDTO>> findAll(
            @RequestParam(required = false) UUID professionalId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Pageable pageable) {
        return ResponseEntity.ok(appointmentService.findAll(professionalId, status, startDate, endDate, pageable));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar consulta")
    public ResponseEntity<AppointmentResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateAppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir consulta")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
