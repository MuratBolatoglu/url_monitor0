package com.example.url_monitor.Monitor;

import com.example.url_monitor.Log.LogEntity;
import com.example.url_monitor.User.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="monitors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_var;

    @Column(name="name",nullable = false)
    private String name_var;

    @Column(name="url",nullable = false)
    private String url_var;

    @Column(name="status")
    private String status_var="PENDING";

    @Column(name="interval_seconds")
    private Integer interval_seconds_var=60;

    @Column(name="created_at")
    private LocalDateTime created_at_var = LocalDateTime.now();

    @Column(name="last_checked_at")
    private LocalDateTime last_checked_at_var;

    @ManyToOne
    @JoinColumn(name="user_id")
    UserEntity user_var;

    @OneToMany(mappedBy = "monitor_var")
    List<LogEntity> logs_var;

    @Enumerated(EnumType.STRING)
    @Column(name="monitor_type",nullable = false)
    private MonitorType monitor_type_var;

    @Enumerated(EnumType.STRING)
    @Column(name="http_method")
    private HttpMethod http_method_var;

    @Column(name="expected_code")
    private Integer expected_code_var;

    @Column(name="keyword")
    private String keyword_var;

    @Column(name="timeout",nullable = false)
    private Integer timeout_var;


}
