package com.clinly.users.entity;

import java.util.UUID;

public class User {

    UUID id;
    String name;
    String email;
    String password;
    String telefone;
    String role;
    public User() {
    }
    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
