package com.example.url_monitor.Security;

import com.example.url_monitor.User.UserEntity;
import com.example.url_monitor.User.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtService jwt_service;
    private final UserRepository user_repository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filter_chain)
    throws ServletException, IOException {
        System.out.println("=== FILTER ÇALIŞTI ===");
        String auth_header = request.getHeader("Authorization");
        System.out.println("Header: " + auth_header);

        if(auth_header == null || !auth_header.startsWith("Bearer ")){
            filter_chain.doFilter(request,response);
            return;
        }
        String token = auth_header.substring(7);
        String email= jwt_service.extractUsername(token);
        System.out.println("Email: " + email);
        UserEntity user= user_repository.findByEmailVar(email).orElse(null);
        System.out.println("User: " + user.getId() + " " + user.getEmailVar());
        if(user != null && jwt_service.isTokenValid(token,user)){
            System.out.println("Authentication başarılı");
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filter_chain.doFilter(request,response);
    }

    private JwtService getJwtService() {
        return jwt_service;
    }
}
