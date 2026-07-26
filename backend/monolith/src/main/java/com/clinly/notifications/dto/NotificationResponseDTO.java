package com.clinly.notifications.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record NotificationResponseDTO(
        java.util.UUID id,
        String title,
        String message,
        boolean read,
        LocalDateTime createdAt
) {}
