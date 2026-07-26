package com.clinly.auth.controllers;
import com.clinly.auth.dto.AuthResponse;
import com.clinly.auth.dto.LoginRequest;
import com.clinly.auth.dto.RegisterRequest;
import com.clinly.auth.dto.UserRegistredEvent;
import com.clinly.auth.entity.Roles;
import com.clinly.auth.entity.UserAuth;
import com.clinly.auth.repository.UserAuthRepository;
import com.clinly.auth.service.AuthRestClient;
import com.clinly.auth.service.JwtService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    private final AuthRestClient authRestClient;

    public AuthController(AuthenticationManager authenticationManager,
                          UserAuthRepository userAuthRepository,
                          JwtService jwtService,
                          PasswordEncoder passwordEncoder,
                          AuthRestClient authRestClient) {
        this.authenticationManager = authenticationManager;
        this.userAuthRepository = userAuthRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authRestClient = authRestClient;
    }

    @PostMapping("/register")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registro realizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Email já cadastrado")
    })
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (userAuthRepository.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().build();
        }

        UserAuth user = new UserAuth(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.name(),
                request.role() != null ? request.role() : Roles.USER
        );

        UserAuth userSalvo = userAuthRepository.save(user);

        UserRegistredEvent event = new UserRegistredEvent(
                userSalvo.getId(),
                userSalvo.getName(),
                userSalvo.getEmail(),
                userSalvo.getRole().name(),
                LocalDateTime.now()
        );
        authRestClient.postRequests(event,"http://localhost:8080/api/profissionais");
        String token = jwtService.generateToken(userSalvo.getEmail());
        return ResponseEntity.ok(new AuthResponse(
                token,
                userSalvo.getEmail(),
                userSalvo.getName(),
                userSalvo.getRole().name()
        ));
    }

    @PostMapping("/login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        String token = jwtService.generateToken(request.email());
        UserAuth user = userAuthRepository.findByEmail(request.email()).orElseThrow();
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getName(), user.getRole().name()));
    }
}