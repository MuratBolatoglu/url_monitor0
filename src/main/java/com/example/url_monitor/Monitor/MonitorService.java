package com.example.url_monitor.Monitor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MonitorService {
    private final MonitorRepository monitor_repository;
    public MonitorEntity CreateMonitor(MonitorDTO request){
        MonitorEntity monitor = MonitorEntity.builder()
                .name_var(request.getMonitor_name())
                .url_var(request.getMonitor_url())
                .interval_seconds_var(request.getInterval_seconds())
                .build();
        return monitor_repository.save(monitor);
    }
}
