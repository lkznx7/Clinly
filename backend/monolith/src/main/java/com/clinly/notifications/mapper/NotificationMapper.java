package com.clinly.notifications.mapper;

import com.clinly.notifications.dto.CreateNotificationDTO;
import com.clinly.notifications.dto.NotificationResponseDTO;
import com.clinly.notifications.entity.Notification;
import com.clinly.users.entity.User;

public final class NotificationMapper {

    private NotificationMapper() {
    }

    public static Notification toEntity(CreateNotificationDTO dto, User user) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(dto.title());
        notification.setMessage(dto.message());
        notification.setRead(false);
        return notification;
    }

    public static NotificationResponseDTO toResponseDTO(Notification notification) {
        return new NotificationResponseDTO(
                notification.getId(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getRead(),
                notification.getCreatedAt()
        );
    }
}
