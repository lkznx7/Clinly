package com.clinly.staff.service;

import com.clinly.clinics.entity.Clinic;
import com.clinly.clinics.repository.ClinicRepository;
import com.clinly.staff.dto.CreateStaffDTO;
import com.clinly.staff.dto.StaffResponseDTO;
import com.clinly.staff.dto.UpdateStaffDTO;
import com.clinly.staff.mapper.StaffMapper;
import com.clinly.shared.dto.PaginatedResponse;
import com.clinly.users.entity.ProfessionalProfile;
import com.clinly.users.entity.User;
import com.clinly.users.exception.UserException;
import com.clinly.users.repository.ProfessionalProfileRepository;
import com.clinly.users.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StaffService {

    private final UsersRepository usersRepository;
    private final ProfessionalProfileRepository professionalProfileRepository;
    private final ClinicRepository clinicRepository;
    private final PasswordEncoder passwordEncoder;

    public StaffService(UsersRepository usersRepository,
                        ProfessionalProfileRepository professionalProfileRepository,
                        ClinicRepository clinicRepository,
                        PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.professionalProfileRepository = professionalProfileRepository;
        this.clinicRepository = clinicRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public StaffResponseDTO findById(UUID id) {
        User user = usersRepository.findById(id)
                .orElseThrow(() -> new UserException("Membro não encontrado com id: " + id));
        ProfessionalProfile profile = professionalProfileRepository.findByUserId(id).orElse(null);
        return StaffMapper.toResponseDTO(user, profile);
    }

    public PaginatedResponse<StaffResponseDTO> findAll(String search, String role, String status, Pageable pageable) {
        Specification<User> spec = (root, query, cb) -> {
            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();

            if (search != null && !search.isBlank()) {
                String pattern = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("firstName")), pattern),
                        cb.like(cb.lower(root.get("lastName")), pattern),
                        cb.like(cb.lower(root.get("email")), pattern)
                ));
            }

            if (status != null && !status.isBlank()) {
                Boolean active = switch (status.toUpperCase()) {
                    case "ACTIVE" -> true;
                    case "INACTIVE", "ON_LEAVE" -> false;
                    default -> null;
                };
                if (active != null) {
                    predicates.add(cb.equal(root.get("active"), active));
                }
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };

        Page<User> page = usersRepository.findAll(spec, pageable);

        Page<StaffResponseDTO> mappedPage = page.map(user -> {
            ProfessionalProfile profile = professionalProfileRepository.findByUserId(user.getId()).orElse(null);
            return StaffMapper.toResponseDTO(user, profile);
        });

        return PaginatedResponse.fromPage(mappedPage);
    }

    public List<StaffResponseDTO> findAllProfessionals() {
        return usersRepository.findAll().stream()
                .filter(user -> user.getActive() != null && user.getActive())
                .map(user -> {
                    ProfessionalProfile profile = professionalProfileRepository.findByUserId(user.getId()).orElse(null);
                    return StaffMapper.toResponseDTO(user, profile);
                })
                .toList();
    }

    @Transactional
    public StaffResponseDTO create(CreateStaffDTO dto) {
        Clinic clinic = clinicRepository.findById(dto.clinicId())
                .orElseThrow(() -> new UserException("Clínica não encontrada com id: " + dto.clinicId()));

        User user = new User();
        user.setFirstName(dto.firstName());
        user.setLastName(dto.lastName() != null ? dto.lastName() : "");
        user.setEmail(dto.email());
        user.setPhone(dto.phone());
        user.setPasswordHash(passwordEncoder.encode("123456"));
        user.setClinic(clinic);
        user.setActive(true);

        User saved = usersRepository.save(user);

        if (dto.specialty() != null || dto.crm() != null) {
            ProfessionalProfile profile = new ProfessionalProfile();
            profile.setUser(saved);
            profile.setSpecialty(dto.specialty());
            profile.setRegistrationNumber(dto.crm());
            professionalProfileRepository.save(profile);
        }

        ProfessionalProfile profile = professionalProfileRepository.findByUserId(saved.getId()).orElse(null);
        return StaffMapper.toResponseDTO(saved, profile);
    }

    @Transactional
    public StaffResponseDTO update(UUID id, UpdateStaffDTO dto) {
        User user = usersRepository.findById(id)
                .orElseThrow(() -> new UserException("Membro não encontrado com id: " + id));

        if (dto.firstName() != null) user.setFirstName(dto.firstName());
        if (dto.lastName() != null) user.setLastName(dto.lastName());
        if (dto.email() != null) user.setEmail(dto.email());
        if (dto.phone() != null) user.setPhone(dto.phone());

        User updated = usersRepository.save(user);

        ProfessionalProfile profile = professionalProfileRepository.findByUserId(id).orElse(null);
        if (dto.specialty() != null || dto.crm() != null) {
            if (profile == null) {
                profile = new ProfessionalProfile();
                profile.setUser(updated);
            }
            if (dto.specialty() != null) profile.setSpecialty(dto.specialty());
            if (dto.crm() != null) profile.setRegistrationNumber(dto.crm());
            professionalProfileRepository.save(profile);
        }

        profile = professionalProfileRepository.findByUserId(id).orElse(null);
        return StaffMapper.toResponseDTO(updated, profile);
    }

    public void delete(UUID id) {
        if (!usersRepository.existsById(id)) {
            throw new UserException("Membro não encontrado com id: " + id);
        }
        usersRepository.deleteById(id);
    }
}
