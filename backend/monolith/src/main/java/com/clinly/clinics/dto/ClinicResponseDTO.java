package com.clinly.clinics.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ClinicResponseDTO(
        UUID id,
        String tradeName,
        String legalName,
        String cnpj,
        String email,
        String phone,
        String zipCode,
        String state,
        String city,
        String neighborhood,
        String street,
        String number,
        String complement,
        Boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
