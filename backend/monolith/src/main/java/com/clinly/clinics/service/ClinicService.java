package com.clinly.clinics.service;

import com.clinly.clinics.dto.ClinicResponseDTO;
import com.clinly.clinics.dto.CreateClinicDTO;
import com.clinly.clinics.dto.UpdateClinicDTO;
import com.clinly.clinics.entity.Clinic;
import com.clinly.clinics.exception.ClinicException;
import com.clinly.clinics.mapper.ClinicMapper;
import com.clinly.clinics.repository.ClinicRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClinicService {

    private final ClinicRepository clinicRepository;

    public ClinicService(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    public ClinicResponseDTO create(CreateClinicDTO dto) {
        Clinic clinic = ClinicMapper.toEntity(dto);
        Clinic saved = clinicRepository.save(clinic);
        return ClinicMapper.toResponseDTO(saved);
    }

    public ClinicResponseDTO findById(UUID id) {
        Clinic clinic = clinicRepository.findById(id)
                .orElseThrow(() -> new ClinicException("Clínica não encontrada com id: " + id));
        return ClinicMapper.toResponseDTO(clinic);
    }

    public List<ClinicResponseDTO> findAll() {
        return clinicRepository.findAll().stream()
                .map(ClinicMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public ClinicResponseDTO update(UUID id, UpdateClinicDTO dto) {
        Clinic clinic = clinicRepository.findById(id)
                .orElseThrow(() -> new ClinicException("Clínica não encontrada com id: " + id));
        ClinicMapper.updateEntityFromDTO(dto, clinic);
        Clinic updated = clinicRepository.save(clinic);
        return ClinicMapper.toResponseDTO(updated);
    }

    @Transactional
    public ClinicResponseDTO toggleActive(UUID id) {
        Clinic clinic = clinicRepository.findById(id)
                .orElseThrow(() -> new ClinicException("Clínica não encontrada com id: " + id));
        clinic.setActive(!clinic.getActive());
        Clinic updated = clinicRepository.save(clinic);
        return ClinicMapper.toResponseDTO(updated);
    }

    public void delete(UUID id) {
        if (!clinicRepository.existsById(id)) {
            throw new ClinicException("Clínica não encontrada com id: " + id);
        }
        clinicRepository.deleteById(id);
    }
}
