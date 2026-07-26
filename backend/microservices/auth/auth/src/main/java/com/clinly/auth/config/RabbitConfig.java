package com.clinly.auth.config;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    public static final String  EXCHANGE_AUTH = "auth_exchange";
    public static final String USER_CREATED = "user.created";

    @Bean
    public DirectExchange authExchange() {
        return new DirectExchange(EXCHANGE_AUTH);
    }



}
