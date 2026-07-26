package com.clinly.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Requisição de login")
public record LoginRequest(
        @Schema(description = "Email do usuário", example = "user@clinly.com", requiredMode = Schema.RequiredMode.REQUIRED)
        @jakarta.validation.constraints.Email
        @jakarta.validation.constraints.NotBlank String email,

        @Schema(description = "Senha do usuário", example = "123456", minLength = 6, requiredMode = Schema.RequiredMode.REQUIRED)
        @jakarta.validation.constraints.NotBlank
        @jakarta.validation.constraints.Size(min = 6) String password
) {}
