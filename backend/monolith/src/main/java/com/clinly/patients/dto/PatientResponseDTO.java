package com.clinly.patients.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record PatientResponseDTO(
        java.util.UUID id,
        String name,
        String email,
        String phone,
        String cpf,
        LocalDate birthDate,
        String gender,
        String address,
        String status,
        String lastAppointment,
        String nextAppointment,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
