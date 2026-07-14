package com.example.url_monitor.Auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService auth_service;
    @PostMapping("/login")
    public String CheckAuth(@RequestBody LoginRequestDTO request) { return auth_service.CheckAuth(request); }
}
