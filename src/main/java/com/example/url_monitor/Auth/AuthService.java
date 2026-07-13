package com.example.url_monitor.Auth;

import com.example.url_monitor.Security.JwtService;
import com.example.url_monitor.User.UserEntity;
import com.example.url_monitor.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final BCryptPasswordEncoder password_encoder;
    private final UserRepository user_repository;
    private final JwtService jwt_service;
    public String CheckAuth(LoginRequestDTO request){
        UserEntity user = user_repository.findByEmailVar(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(password_encoder.matches( request.getPassword() ,user.getPasswordHash_var())){
            return jwt_service.generateToken(user);
        }else{
            throw new RuntimeException("Incorrect password");
        }
    }

}
