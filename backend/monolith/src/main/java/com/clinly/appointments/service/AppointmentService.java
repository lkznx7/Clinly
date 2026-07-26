package com.clinly.appointments.service;

import com.clinly.appointments.dto.AppointmentResponseDTO;
import com.clinly.appointments.dto.CreateAppointmentDTO;
import com.clinly.appointments.dto.UpdateAppointmentDTO;
import com.clinly.appointments.entity.Appointment;
import com.clinly.appointments.exception.AppointmentException;
import com.clinly.appointments.mapper.AppointmentMapper;
import com.clinly.appointments.repository.AppointmentRepository;
import com.clinly.clinics.entity.Clinic;
import com.clinly.clinics.repository.ClinicRepository;
import com.clinly.patients.entity.Patient;
import com.clinly.patients.repository.PatientRepository;
import com.clinly.shared.dto.PaginatedResponse;
import com.clinly.shared.enums.AppointmentStatus;
import com.clinly.users.entity.User;
import com.clinly.users.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ClinicRepository clinicRepository;
    private final UsersRepository usersRepository;
    private final PatientRepository patientRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              ClinicRepository clinicRepository,
                              UsersRepository usersRepository,
                              PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clinicRepository = clinicRepository;
        this.usersRepository = usersRepository;
        this.patientRepository = patientRepository;
    }

    public AppointmentResponseDTO create(CreateAppointmentDTO dto) {
        Clinic clinic = clinicRepository.findById(dto.clinicId())
                .orElseThrow(() -> new AppointmentException("Clínica não encontrada com id: " + dto.clinicId()));
        User professional = usersRepository.findById(dto.professionalId())
                .orElseThrow(() -> new AppointmentException("Profissional não encontrado com id: " + dto.professionalId()));
        Patient patient = patientRepository.findById(dto.patientId())
                .orElseThrow(() -> new AppointmentException("Paciente não encontrado com id: " + dto.patientId()));

        Appointment appointment = AppointmentMapper.toEntity(dto, clinic, professional, patient);
        Appointment saved = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponseDTO(saved);
    }

    public AppointmentResponseDTO findById(UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentException("Consulta não encontrada com id: " + id));
        return AppointmentMapper.toResponseDTO(appointment);
    }

    public PaginatedResponse<AppointmentResponseDTO> findAll(UUID professionalId, String status,
                                                              LocalDate startDate, LocalDate endDate,
                                                              Pageable pageable) {
        Specification<Appointment> spec = (root, query, cb) -> {
            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();

            if (professionalId != null) {
                predicates.add(cb.equal(root.get("professional").get("id"), professionalId));
            }

            if (status != null && !status.isBlank()) {
                try {
                    AppointmentStatus appointmentStatus = AppointmentStatus.valueOf(status.toUpperCase());
                    predicates.add(cb.equal(root.get("status"), appointmentStatus));
                } catch (IllegalArgumentException ignored) {
                }
            }

            if (startDate != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startAt"), startDate.atStartOfDay()));
            }

            if (endDate != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("startAt"), endDate.atTime(LocalTime.MAX)));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };

        Page<Appointment> page = appointmentRepository.findAll(spec, pageable);
        return PaginatedResponse.fromPage(page.map(AppointmentMapper::toResponseDTO));
    }

    @Transactional
    public AppointmentResponseDTO update(UUID id, UpdateAppointmentDTO dto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentException("Consulta não encontrada com id: " + id));
        AppointmentMapper.updateEntityFromDTO(dto, appointment);
        Appointment updated = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponseDTO(updated);
    }

    @Transactional
    public AppointmentResponseDTO cancel(UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentException("Consulta não encontrada com id: " + id));
        appointment.setStatus(AppointmentStatus.CANCELLED);
        Appointment updated = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponseDTO(updated);
    }

    @Transactional
    public AppointmentResponseDTO confirm(UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentException("Consulta não encontrada com id: " + id));
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        Appointment updated = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponseDTO(updated);
    }

    @Transactional
    public AppointmentResponseDTO markNoShow(UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentException("Consulta não encontrada com id: " + id));
        appointment.setStatus(AppointmentStatus.NO_SHOW);
        Appointment updated = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponseDTO(updated);
    }

    public void delete(UUID id) {
        if (!appointmentRepository.existsById(id)) {
            throw new AppointmentException("Consulta não encontrada com id: " + id);
        }
        appointmentRepository.deleteById(id);
    }
}
