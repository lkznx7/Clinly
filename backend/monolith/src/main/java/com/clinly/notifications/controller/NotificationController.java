package com.clinly.notifications.controller;

import com.clinly.notifications.dto.NotificationResponseDTO;
import com.clinly.notifications.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@Tag(name = "Notificações", description = "Endpoints de gestão de notificações")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "Listar notificações do usuário logado")
    public ResponseEntity<List<NotificationResponseDTO>> findByCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(notificationService.findByUserEmail(email));
    }
}
