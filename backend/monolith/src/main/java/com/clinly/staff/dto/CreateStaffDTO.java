package com.clinly.staff.dto;

import com.clinly.shared.enums.StaffRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateStaffDTO(
        @NotBlank(message = "Nome é obrigatório")
        String firstName,

        String lastName,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        String phone,

        StaffRole role,

        String specialty,

        String crm,

        java.util.UUID clinicId
) {}
