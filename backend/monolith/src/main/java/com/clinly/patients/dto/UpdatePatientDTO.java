package com.clinly.patients.dto;

import com.clinly.shared.enums.GenderType;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UpdatePatientDTO(
        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String firstName,

        @Size(max = 100, message = "Sobrenome deve ter no máximo 100 caracteres")
        String lastName,

        @Size(min = 11, max = 14, message = "CPF deve ter entre 11 e 14 caracteres")
        String cpf,

        String email,

        @Size(max = 20, message = "Telefone deve ter no máximo 20 caracteres")
        String phone,

        LocalDate birthDate,

        GenderType gender,

        BigDecimal weight,

        BigDecimal height,

        String observations
) {}
