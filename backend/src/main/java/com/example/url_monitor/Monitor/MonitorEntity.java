package com.example.url_monitor.Monitor;

import com.example.url_monitor.Log.LogEntity;
import com.example.url_monitor.User.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="monitors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_var;

    @Column(name="name",nullable = false)
    private String nameVar;

    @Column(name="url",nullable = false)
    private String urlVar;

    @Column(name="status")
    @Builder.Default
    private String statusVar="PENDING";

    @Column(name="interval_seconds")
    private Integer intervalSecondsVar=60;

    @Column(name="created_at")
    @Builder.Default
    private LocalDateTime createdAtVar = LocalDateTime.now();

    @Column(name="status_code")
    private Integer statusCode;

    @Column(name="last_checked_at")
    private LocalDateTime last_checked_at_var;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private UserEntity userVar;

    @OneToMany(mappedBy = "monitorVar", cascade=CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<LogEntity> logs_var;

    @Enumerated(EnumType.STRING)
    @Column(name="monitor_type",nullable = false)
    private MonitorType monitor_type_var;

    @Enumerated(EnumType.STRING)
    @Column(name="http_method")
    private HttpMethod http_method_var;

    @Column(name="expected_code")
    private Integer expectedCodeVar;

    @Column(name="keyword")
    private String keyword_var;

    @Column(name="timeout",nullable = false)
    private Integer timeoutVar;

    @Column(name="enabled")
    @Builder.Default
    private Boolean enabledVar= true;

    @Column(name = "request_body", columnDefinition = "TEXT")
    private String requestBodyVar;

    @Column(name = "request_headers", columnDefinition = "TEXT")
    private String requestHeadersVar;
}
