package com.clinly.appointments.dto;

import com.clinly.shared.enums.AppointmentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record UpdateAppointmentDTO(
        LocalDateTime startAt,
        LocalDateTime endAt,
        BigDecimal price,
        AppointmentStatus status,
        String notes
) {}
