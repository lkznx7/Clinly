package com.clinly.auth.service;

import com.clinly.auth.dto.UserRegistredEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AuthRestClient {
    RestClient restClient;
    public AuthRestClient(RestClient restClient) {
        this.restClient = restClient;
    }
    public void postRequests(UserRegistredEvent event,String uri){
        var request = RestClient.create();
        request.post().uri(uri)
                .body(UserRegistredEvent.class).retrieve()
                .toBodilessEntity();
    }
}
