package com.clinly.appointments.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record AppointmentResponseDTO(
        java.util.UUID id,
        java.util.UUID patientId,
        String patientName,
        java.util.UUID professionalId,
        String professionalName,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        String type,
        String status,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
