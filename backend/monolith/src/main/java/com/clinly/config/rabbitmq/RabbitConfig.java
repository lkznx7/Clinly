package com.clinly.config.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String EXCHANGE_AUTH = "auth_exchange";
    public static final String QUEUE_USERS = "users.queue";
    public static final String ROUTING_KEY_USER_CREATED = "user.created";

    @Bean
    public DirectExchange authExchange() {
        return new DirectExchange(EXCHANGE_AUTH);
    }

    @Bean
    public Queue usersQueue() {
        return new Queue(QUEUE_USERS, true);
    }

    @Bean
    public Binding usersBinding(Queue usersQueue, DirectExchange authExchange) {
        return BindingBuilder.bind(usersQueue).to(authExchange).with(ROUTING_KEY_USER_CREATED);
    }
}
