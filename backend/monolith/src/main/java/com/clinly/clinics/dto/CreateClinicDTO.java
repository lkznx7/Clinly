package com.clinly.clinics.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateClinicDTO(
        @NotBlank(message = "Nome fantasia é obrigatório")
        @Size(max = 150, message = "Nome fantasia deve ter no máximo 150 caracteres")
        String tradeName,

        @Size(max = 200, message = "Razão social deve ter no máximo 200 caracteres")
        String legalName,

        @NotBlank(message = "CNPJ é obrigatório")
        @Size(min = 14, max = 18, message = "CNPJ deve ter entre 14 e 18 caracteres")
        String cnpj,

        @Email(message = "Email inválido")
        String email,

        @Size(max = 20, message = "Telefone deve ter no máximo 20 caracteres")
        String phone,

        @Size(max = 10, message = "CEP deve ter no máximo 10 caracteres")
        String zipCode,

        @Size(max = 100, message = "Estado deve ter no máximo 100 caracteres")
        String state,

        @Size(max = 100, message = "Cidade deve ter no máximo 100 caracteres")
        String city,

        @Size(max = 100, message = "Bairro deve ter no máximo 100 caracteres")
        String neighborhood,

        @Size(max = 200, message = "Rua deve ter no máximo 200 caracteres")
        String street,

        @Size(max = 20, message = "Número deve ter no máximo 20 caracteres")
        String number,

        @Size(max = 100, message = "Complemento deve ter no máximo 100 caracteres")
        String complement
) {}
