package com.clinly.appointments.repository;

import com.clinly.appointments.entity.Appointment;
import com.clinly.shared.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Appointment> {

    List<Appointment> findByClinicIdAndStartAtAfter(UUID clinicId, LocalDateTime startAt);

    List<Appointment> findByClinicIdAndStartAtBetween(
            UUID clinicId, LocalDateTime start, LocalDateTime end);

    List<Appointment> findByProfessionalIdAndStartAtAfter(UUID professionalId, LocalDateTime startAt);

    List<Appointment> findByPatientId(UUID patientId);

    long countByClinicIdAndStatus(UUID clinicId, AppointmentStatus status);

    long countByStartAtBetween(LocalDateTime start, LocalDateTime end);

    long countByStatus(AppointmentStatus status);

    List<Appointment> findTop5ByOrderByCreatedAtDesc();
}
