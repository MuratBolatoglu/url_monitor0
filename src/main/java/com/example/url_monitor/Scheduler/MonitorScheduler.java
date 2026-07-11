package com.example.url_monitor.Scheduler;

import com.example.url_monitor.Monitor.MonitorEntity;
import com.example.url_monitor.Monitor.MonitorRepository;
import com.example.url_monitor.MonitorCheck.CheckMonitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitorScheduler {
    private final MonitorRepository monitor_repository;
    private final CheckMonitorService check_monitor_service;

    @Scheduled(fixedRate = 5000)
    public void CheckMonitors(){
        List<MonitorEntity> monitors= monitor_repository.findByEnabledVarTrue();
        for(MonitorEntity monitor : monitors){
            if (monitor.getLast_checked_at_var() == null) {
                check_monitor_service.CheckMonitor(monitor);
                continue;
            }
            LocalDateTime nextCheck = monitor.getLast_checked_at_var().plusSeconds(monitor.getIntervalSecondsVar());

            if (LocalDateTime.now().isAfter(nextCheck)) check_monitor_service.CheckMonitor(monitor);
        }
    }
}
