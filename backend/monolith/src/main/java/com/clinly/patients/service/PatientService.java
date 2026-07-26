package com.clinly.patients.service;

import com.clinly.clinics.entity.Clinic;
import com.clinly.clinics.repository.ClinicRepository;
import com.clinly.patients.dto.CreatePatientDTO;
import com.clinly.patients.dto.PatientResponseDTO;
import com.clinly.patients.dto.UpdatePatientDTO;
import com.clinly.patients.entity.Patient;
import com.clinly.patients.exception.PatientException;
import com.clinly.patients.mapper.PatientMapper;
import com.clinly.patients.repository.PatientRepository;
import com.clinly.shared.dto.PaginatedResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final ClinicRepository clinicRepository;

    public PatientService(PatientRepository patientRepository, ClinicRepository clinicRepository) {
        this.patientRepository = patientRepository;
        this.clinicRepository = clinicRepository;
    }

    public PatientResponseDTO create(CreatePatientDTO dto) {
        Clinic clinic = clinicRepository.findById(dto.clinicId())
                .orElseThrow(() -> new PatientException("Clínica não encontrada com id: " + dto.clinicId()));
        Patient patient = PatientMapper.toEntity(dto, clinic);
        Patient saved = patientRepository.save(patient);
        return PatientMapper.toResponseDTO(saved);
    }

    public PatientResponseDTO findById(java.util.UUID id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientException("Paciente não encontrado com id: " + id));
        return PatientMapper.toResponseDTO(patient);
    }

    public PaginatedResponse<PatientResponseDTO> findAll(String search, String status, Pageable pageable) {
        Specification<Patient> spec = (root, query, cb) -> {
            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();

            if (search != null && !search.isBlank()) {
                String pattern = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("firstName")), pattern),
                        cb.like(cb.lower(root.get("lastName")), pattern),
                        cb.like(cb.lower(root.get("email")), pattern),
                        cb.like(cb.lower(root.get("cpf")), pattern)
                ));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };

        Page<Patient> page = patientRepository.findAll(spec, pageable);
        return PaginatedResponse.fromPage(page.map(PatientMapper::toResponseDTO));
    }

    @Transactional
    public PatientResponseDTO update(java.util.UUID id, UpdatePatientDTO dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientException("Paciente não encontrado com id: " + id));
        PatientMapper.updateEntityFromDTO(dto, patient);
        Patient updated = patientRepository.save(patient);
        return PatientMapper.toResponseDTO(updated);
    }

    public void delete(java.util.UUID id) {
        if (!patientRepository.existsById(id)) {
            throw new PatientException("Paciente não encontrado com id: " + id);
        }
        patientRepository.deleteById(id);
    }
}
