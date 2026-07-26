package com.clinly.appointments.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateAppointmentDTO(
        @NotNull(message = "ID da clínica é obrigatório")
        UUID clinicId,

        @NotNull(message = "ID do profissional é obrigatório")
        UUID professionalId,

        @NotNull(message = "ID do paciente é obrigatório")
        UUID patientId,

        @NotNull(message = "Data/hora de início é obrigatória")
        LocalDateTime startAt,

        @NotNull(message = "Data/hora de término é obrigatória")
        LocalDateTime endAt,

        java.math.BigDecimal price,

        String notes
) {}
