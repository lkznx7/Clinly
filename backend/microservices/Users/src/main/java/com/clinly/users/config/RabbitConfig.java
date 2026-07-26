package com.clinly.users.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String QUEUE_NAME = "users.queue";
    public static final String EXCHANGE_NAME = "users.exchange";

    @Bean
    public Queue queue() {
        return new Queue(QUEUE_NAME, true);
    }
    @Bean
    public Binding binding(Queue queue, DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("userCreated");
    }
}
