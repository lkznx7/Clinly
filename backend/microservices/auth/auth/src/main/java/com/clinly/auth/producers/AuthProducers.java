package com.clinly.auth.producers;;
import com.clinly.auth.dto.UserRegistredEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import static com.clinly.auth.config.RabbitConfig.EXCHANGE_NAME;
import static com.clinly.auth.config.RabbitConfig.USER_CREATED_ROUTING_KEY;

@Service
public class AuthProducers {

    RabbitTemplate rabbitTemplate;

    public AuthProducers(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendMessage(UserRegistredEvent event){
        rabbitTemplate.convertAndSend( EXCHANGE_NAME,USER_CREATED_ROUTING_KEY,event);
    }

}
