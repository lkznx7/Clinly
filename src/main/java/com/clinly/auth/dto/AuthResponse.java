package com.clinly.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta de autenticação")
public record AuthResponse(
        @Schema(description = "Token JWT", example = "eyJhbGciOiJIUzI1NiJ9...")
        String token,

        @Schema(description = "Email do usuário", example = "user@clinly.com")
        String email,

        @Schema(description = "Perfil do usuário", example = "USER")
        String role
) {}
