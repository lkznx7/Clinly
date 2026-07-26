package com.clinly.professionals.controller;

import com.clinly.staff.dto.StaffResponseDTO;
import com.clinly.staff.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/professionals")
@Tag(name = "Profissionais", description = "Listar profissionais para dropdowns")
public class ProfessionalsController {

    private final StaffService staffService;

    public ProfessionalsController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    @Operation(summary = "Listar profissionais")
    public ResponseEntity<List<StaffResponseDTO>> findAll() {
        return ResponseEntity.ok(staffService.findAllProfessionals());
    }
}
