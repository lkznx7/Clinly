package com.clinly.auth.controller;

import com.clinly.auth.dto.AuthResponse;
import com.clinly.auth.dto.LoginRequest;
import com.clinly.auth.dto.RegisterRequest;
import com.clinly.auth.dto.UserRegistredEvent;
import com.clinly.auth.producer.AuthProducers;
import com.clinly.auth.repository.UserAuthRepository;
import com.clinly.auth.service.JwtService;
import com.clinly.users.entity.User;
import com.clinly.shared.enums.GenderType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints de registro e login")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserAuthRepository userAuthRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthProducers authProducers;

    public AuthController(AuthenticationManager authenticationManager,
                          UserAuthRepository userAuthRepository,
                          JwtService jwtService,
                          PasswordEncoder passwordEncoder,
                          AuthProducers authProducers) {
        this.authenticationManager = authenticationManager;
        this.userAuthRepository = userAuthRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authProducers = authProducers;
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar usuário")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (userAuthRepository.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().build();
        }

        String[] nameParts = request.name().trim().split("\\s+", 2);
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setGender(GenderType.NOT_INFORMED);
        user.setActive(true);

        User saved = userAuthRepository.save(user);
        String token = jwtService.generateToken(saved.getEmail());

        authProducers.sendMessage(new UserRegistredEvent(
                saved.getId(),
                request.name(),
                saved.getEmail(),
                "USER",
                LocalDateTime.now()
        ));

        return ResponseEntity.ok(new AuthResponse(
                token,
                saved.getEmail(),
                request.name(),
                "USER"
        ));
    }

    @PostMapping("/login")
    @Operation(summary = "Login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        String token = jwtService.generateToken(request.email());
        User user = userAuthRepository.findByEmail(request.email()).orElseThrow();

        String role = "USER";
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            role = user.getRoles().get(0).getName();
        }

        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getEmail(),
                user.getFirstName(),
                role
        ));
    }
}
