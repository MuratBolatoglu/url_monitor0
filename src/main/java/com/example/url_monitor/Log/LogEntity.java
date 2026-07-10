package com.example.url_monitor.Log;

import com.example.url_monitor.Monitor.MonitorEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="monitor_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_var;

    @Column(name="status",nullable = false)
    private String status_var;

    @Column(name="status_code")
    private Integer status_code_var;

    @Column(name="response_time_ms")
    private Integer response_time_ms_var;

    @Column(name="error_message")
    private String error_message_var;

    @Column(name="checked_at")
    private LocalDateTime checked_at_var = LocalDateTime.now();

    @Column(name="message")
    private String message;

    @ManyToOne
    @JoinColumn(name="monitor_id")
    private MonitorEntity monitor_var;
}
