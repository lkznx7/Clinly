package com.clinly.staff.mapper;

import com.clinly.staff.dto.StaffResponseDTO;
import com.clinly.users.entity.ProfessionalProfile;
import com.clinly.users.entity.User;

public final class StaffMapper {

    private StaffMapper() {
    }

    public static StaffResponseDTO toResponseDTO(User user, ProfessionalProfile profile) {
        String fullName = (user.getFirstName() != null ? user.getFirstName() : "")
                + (user.getLastName() != null ? " " + user.getLastName() : "");

        String role = null;
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            role = user.getRoles().get(0).getName();
        }

        return new StaffResponseDTO(
                user.getId(),
                fullName.trim(),
                user.getEmail(),
                user.getPhone(),
                role,
                profile != null ? profile.getSpecialty() : null,
                profile != null ? profile.getRegistrationNumber() : null,
                user.getActive() != null && user.getActive() ? "ACTIVE" : "INACTIVE",
                null,
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
