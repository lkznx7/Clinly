package com.clinly.staff.dto;

import com.clinly.shared.enums.StaffRole;
import jakarta.validation.constraints.Email;

public record UpdateStaffDTO(
        String firstName,

        String lastName,

        @Email(message = "Email inválido")
        String email,

        String phone,

        StaffRole role,

        String specialty,

        String crm
) {}
