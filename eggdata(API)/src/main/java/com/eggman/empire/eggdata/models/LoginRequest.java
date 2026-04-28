package com.eggman.empire.eggdata.models;

import lombok.Data;

@Data
public class LoginRequest {
    private String userName;
    private String password;
}