package com.clinly.appointments.mapper;

import com.clinly.appointments.dto.AppointmentResponseDTO;
import com.clinly.appointments.dto.CreateAppointmentDTO;
import com.clinly.appointments.dto.UpdateAppointmentDTO;
import com.clinly.appointments.entity.Appointment;
import com.clinly.clinics.entity.Clinic;
import com.clinly.patients.entity.Patient;
import com.clinly.users.entity.User;

public final class AppointmentMapper {

    private AppointmentMapper() {
    }

    public static Appointment toEntity(CreateAppointmentDTO dto, Clinic clinic,
                                       User professional, Patient patient) {
        Appointment appointment = new Appointment();
        appointment.setClinic(clinic);
        appointment.setProfessional(professional);
        appointment.setPatient(patient);
        appointment.setStartAt(dto.startAt());
        appointment.setEndAt(dto.endAt());
        appointment.setPrice(dto.price());
        appointment.setNotes(dto.notes());
        return appointment;
    }

    public static void updateEntityFromDTO(UpdateAppointmentDTO dto, Appointment appointment) {
        if (dto.startAt() != null) appointment.setStartAt(dto.startAt());
        if (dto.endAt() != null) appointment.setEndAt(dto.endAt());
        if (dto.price() != null) appointment.setPrice(dto.price());
        if (dto.status() != null) appointment.setStatus(dto.status());
        if (dto.notes() != null) appointment.setNotes(dto.notes());
    }

    public static AppointmentResponseDTO toResponseDTO(Appointment appointment) {
        String patientName = null;
        if (appointment.getPatient() != null) {
            patientName = (appointment.getPatient().getFirstName() != null ? appointment.getPatient().getFirstName() : "")
                    + (appointment.getPatient().getLastName() != null ? " " + appointment.getPatient().getLastName() : "");
            patientName = patientName.trim();
        }

        String professionalName = null;
        if (appointment.getProfessional() != null) {
            professionalName = (appointment.getProfessional().getFirstName() != null ? appointment.getProfessional().getFirstName() : "")
                    + (appointment.getProfessional().getLastName() != null ? " " + appointment.getProfessional().getLastName() : "");
            professionalName = professionalName.trim();
        }

        return new AppointmentResponseDTO(
                appointment.getId(),
                appointment.getPatient() != null ? appointment.getPatient().getId() : null,
                patientName,
                appointment.getProfessional() != null ? appointment.getProfessional().getId() : null,
                professionalName,
                appointment.getStartAt() != null ? appointment.getStartAt().toLocalDate() : null,
                appointment.getStartAt() != null ? appointment.getStartAt().toLocalTime() : null,
                appointment.getEndAt() != null ? appointment.getEndAt().toLocalTime() : null,
                "CONSULTATION",
                appointment.getStatus() != null ? appointment.getStatus().name() : null,
                appointment.getNotes(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt()
        );
    }
}
