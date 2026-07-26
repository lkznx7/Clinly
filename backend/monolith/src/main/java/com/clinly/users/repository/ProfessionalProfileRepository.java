package com.clinly.users.repository;

import com.clinly.users.entity.ProfessionalProfile;
import com.clinly.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProfessionalProfileRepository extends JpaRepository<ProfessionalProfile, UUID> {

    Optional<ProfessionalProfile> findByUserId(UUID userId);
}
