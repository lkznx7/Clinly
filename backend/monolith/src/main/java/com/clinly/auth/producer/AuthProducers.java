package com.clinly.auth.producer;

import com.clinly.auth.dto.UserRegistredEvent;
import com.clinly.config.rabbitmq.RabbitConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class AuthProducers {

    RabbitTemplate rabbitTemplate;

    public AuthProducers(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendMessage(UserRegistredEvent event) {
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE_AUTH, RabbitConfig.USER_CREATED, event);
    }
}
