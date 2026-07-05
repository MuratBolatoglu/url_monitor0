package com.example.url_monitor.User;

import com.example.url_monitor.Monitor.MonitorEntity;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="email",nullable = false, unique = true)
    private String email_var;

    @Column(name="passwordHash", nullable = false)
    private String passwordHash_var;

    @Column(name="createdAt")
    private LocalDateTime createdAt_var = LocalDateTime.now();

    @OneToMany(mappedBy = "user_var")
    private List<MonitorEntity> monitors = new ArrayList<>();
}