package com.clinly.staff.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record StaffResponseDTO(
        java.util.UUID id,
        String name,
        String email,
        String phone,
        String role,
        String specialty,
        String crm,
        String status,
        String avatarUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
