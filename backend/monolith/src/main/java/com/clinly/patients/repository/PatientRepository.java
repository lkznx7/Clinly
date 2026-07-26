package com.clinly.patients.repository;

import com.clinly.patients.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Patient> {

    List<Patient> findByClinicId(UUID clinicId);

    List<Patient> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName, String lastName);

    long countByCreatedAtAfter(java.time.LocalDateTime date);
}
