package com.clinly.auth.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserRegistredEvent(
        UUID userId,
        String name,
        String email,
        String role,
        LocalDateTime registeredAt
) {}
