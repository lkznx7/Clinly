package com.clinly.users.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;

import static com.clinly.users.config.RabbitConfig.QUEUE_NAME;

public class UserCretedConsumer {

    @RabbitListener(queues = QUEUE_NAME)
    public void consumerUserCreated(@Payload String name){
        // colocar oq vai acontecer quando o evento for consumido
    }
}
