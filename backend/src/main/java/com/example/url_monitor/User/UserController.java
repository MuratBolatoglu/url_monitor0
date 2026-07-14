package com.example.url_monitor.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService user_service;

    @PostMapping
    public UserEntity CreateUser(@RequestBody UserDTO request) { return user_service.CreateUser(request); }

}

