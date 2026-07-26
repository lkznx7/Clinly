package com.clinly.dashboard.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigRabbit {

    private RabbitTemplate rabbitTemplate;
    public ConfigRabbit(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Bean
    public Queue dashboardQueue() {
        return new Queue("DashboardQueue",true);
    }

    @Bean
    public DirectExchange dashboardExchange() {
        return new DirectExchange("DashboardExchange"/*local para onde a mensagem vai*/);
    }

    @Bean
    public Binding binding(Queue dashboardQueue, DirectExchange dashboardExchange) {
        return BindingBuilder.bind(dashboardQueue)
                .to(dashboardExchange)
                .with("dashboard.info");
    }

}
