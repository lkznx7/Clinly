package com.clinly.notifications.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateNotificationDTO(
        @NotNull(message = "ID do usuário é obrigatório")
        UUID userId,

        @NotBlank(message = "Título é obrigatório")
        String title,

        @NotBlank(message = "Mensagem é obrigatória")
        String message
) {}
