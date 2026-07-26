package com.clinly.users.consumer;

import com.clinly.auth.dto.UserRegistredEvent;
import com.clinly.config.rabbitmq.RabbitConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class UserCretedConsumer {

    @RabbitListener(queues = RabbitConfig.QUEUE_USERS)
    public void consumerUserCreated(@Payload UserRegistredEvent event) {
        // TODO: implementar lógica pós-registro (ex: criar role padrão, enviar email de boas-vindas)
    }
}
