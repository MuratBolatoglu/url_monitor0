package com.example.url_monitor.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository user_repository;
    private final BCryptPasswordEncoder password_encoder;
    public UserEntity CreateUser(UserDTO request){

        String hashed_password = password_encoder.encode(request.getPassword());
        UserEntity user= UserEntity.builder()
                .email_var(request.getEmail())
                .passwordHash_var(hashed_password)
                .build();
        return user_repository.save(user);
    }
}
