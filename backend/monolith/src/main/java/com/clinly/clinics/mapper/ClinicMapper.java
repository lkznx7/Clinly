package com.clinly.clinics.mapper;

import com.clinly.clinics.dto.ClinicResponseDTO;
import com.clinly.clinics.dto.CreateClinicDTO;
import com.clinly.clinics.dto.UpdateClinicDTO;
import com.clinly.clinics.entity.Clinic;

public final class ClinicMapper {

    private ClinicMapper() {
    }

    public static Clinic toEntity(CreateClinicDTO dto) {
        Clinic clinic = new Clinic();
        clinic.setTradeName(dto.tradeName());
        clinic.setLegalName(dto.legalName());
        clinic.setCnpj(dto.cnpj());
        clinic.setEmail(dto.email());
        clinic.setPhone(dto.phone());
        clinic.setZipCode(dto.zipCode());
        clinic.setState(dto.state());
        clinic.setCity(dto.city());
        clinic.setNeighborhood(dto.neighborhood());
        clinic.setStreet(dto.street());
        clinic.setNumber(dto.number());
        clinic.setComplement(dto.complement());
        clinic.setActive(true);
        return clinic;
    }

    public static void updateEntityFromDTO(UpdateClinicDTO dto, Clinic clinic) {
        clinic.setTradeName(dto.tradeName());
        clinic.setLegalName(dto.legalName());
        clinic.setCnpj(dto.cnpj());
        clinic.setEmail(dto.email());
        clinic.setPhone(dto.phone());
        clinic.setZipCode(dto.zipCode());
        clinic.setState(dto.state());
        clinic.setCity(dto.city());
        clinic.setNeighborhood(dto.neighborhood());
        clinic.setStreet(dto.street());
        clinic.setNumber(dto.number());
        clinic.setComplement(dto.complement());
        if (dto.active() != null) {
            clinic.setActive(dto.active());
        }
    }

    public static ClinicResponseDTO toResponseDTO(Clinic clinic) {
        return new ClinicResponseDTO(
                clinic.getId(),
                clinic.getTradeName(),
                clinic.getLegalName(),
                clinic.getCnpj(),
                clinic.getEmail(),
                clinic.getPhone(),
                clinic.getZipCode(),
                clinic.getState(),
                clinic.getCity(),
                clinic.getNeighborhood(),
                clinic.getStreet(),
                clinic.getNumber(),
                clinic.getComplement(),
                clinic.getActive(),
                clinic.getCreatedAt(),
                clinic.getUpdatedAt()
        );
    }
}
