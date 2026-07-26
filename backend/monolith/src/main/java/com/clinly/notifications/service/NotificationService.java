package com.clinly.notifications.service;

import com.clinly.notifications.dto.NotificationResponseDTO;
import com.clinly.notifications.entity.Notification;
import com.clinly.notifications.exception.NotificationException;
import com.clinly.notifications.mapper.NotificationMapper;
import com.clinly.notifications.repository.NotificationRepository;
import com.clinly.users.entity.User;
import com.clinly.users.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UsersRepository usersRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UsersRepository usersRepository) {
        this.notificationRepository = notificationRepository;
        this.usersRepository = usersRepository;
    }

    public List<NotificationResponseDTO> findByUserEmail(String email) {
        User user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new NotificationException("Usuário não encontrado com email: " + email));
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(NotificationMapper::toResponseDTO)
                .toList();
    }

    public NotificationResponseDTO create(com.clinly.notifications.dto.CreateNotificationDTO dto) {
        User user = usersRepository.findById(dto.userId())
                .orElseThrow(() -> new NotificationException("Usuário não encontrado com id: " + dto.userId()));
        Notification notification = NotificationMapper.toEntity(dto, user);
        Notification saved = notificationRepository.save(notification);
        return NotificationMapper.toResponseDTO(saved);
    }

    public List<NotificationResponseDTO> findByUserId(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(NotificationMapper::toResponseDTO)
                .toList();
    }

    public long countUnread(UUID userId) {
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    public NotificationResponseDTO markAsRead(UUID id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationException("Notificação não encontrada com id: " + id));
        notification.setRead(true);
        Notification updated = notificationRepository.save(notification);
        return NotificationMapper.toResponseDTO(updated);
    }

    public void delete(UUID id) {
        if (!notificationRepository.existsById(id)) {
            throw new NotificationException("Notificação não encontrada com id: " + id);
        }
        notificationRepository.deleteById(id);
    }
}
