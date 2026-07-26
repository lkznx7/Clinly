package com.clinly.patients.mapper;

import com.clinly.clinics.entity.Clinic;
import com.clinly.patients.dto.CreatePatientDTO;
import com.clinly.patients.dto.PatientResponseDTO;
import com.clinly.patients.dto.UpdatePatientDTO;
import com.clinly.patients.entity.Patient;

public final class PatientMapper {

    private PatientMapper() {
    }

    public static Patient toEntity(CreatePatientDTO dto, Clinic clinic) {
        Patient patient = new Patient();
        patient.setFirstName(dto.firstName());
        patient.setLastName(dto.lastName());
        patient.setCpf(dto.cpf());
        patient.setEmail(dto.email());
        patient.setPhone(dto.phone());
        patient.setBirthDate(dto.birthDate());
        patient.setGender(dto.gender());
        patient.setClinic(clinic);
        return patient;
    }

    public static void updateEntityFromDTO(UpdatePatientDTO dto, Patient patient) {
        if (dto.firstName() != null) patient.setFirstName(dto.firstName());
        if (dto.lastName() != null) patient.setLastName(dto.lastName());
        if (dto.cpf() != null) patient.setCpf(dto.cpf());
        if (dto.email() != null) patient.setEmail(dto.email());
        if (dto.phone() != null) patient.setPhone(dto.phone());
        if (dto.birthDate() != null) patient.setBirthDate(dto.birthDate());
        if (dto.gender() != null) patient.setGender(dto.gender());
    }

    public static PatientResponseDTO toResponseDTO(Patient patient) {
        String fullName = (patient.getFirstName() != null ? patient.getFirstName() : "")
                + (patient.getLastName() != null ? " " + patient.getLastName() : "");

        return new PatientResponseDTO(
                patient.getId(),
                fullName.trim(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getCpf(),
                patient.getBirthDate(),
                patient.getGender() != null ? patient.getGender().name() : null,
                null,
                "ACTIVE",
                null,
                null,
                patient.getCreatedAt(),
                patient.getUpdatedAt()
        );
    }
}
