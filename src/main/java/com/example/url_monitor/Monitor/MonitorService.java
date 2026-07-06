package com.example.url_monitor.Monitor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitorService {
    private final MonitorRepository monitor_repository;
    public MonitorEntity CreateMonitor(MonitorDTO request){
        MonitorEntity monitor = MonitorEntity.builder()
                .name_var(request.getMonitor_name())
                .url_var(request.getMonitor_url())
                .interval_seconds_var(request.getInterval_seconds())
                .monitor_type_var(request.getMonitor_type())
                .expected_code_var(request.getExpected_status_code())
                .keyword_var(request.getKeyword())
                .http_method_var(request.getMethod())
                .timeout_var(request.getTimeout())
                .build();
        return monitor_repository.save(monitor);
    }
    public MonitorEntity GetMonitor(Long id){
        return monitor_repository.findById(id).orElseThrow(() -> new RuntimeException("Monitor not found"));
    }
    public List<MonitorEntity> GetAllMonitors(){
        return monitor_repository.findAll();
    }
    public void DeleteMonitor(Long id){
        monitor_repository.deleteById(id);
    }

    public MonitorEntity UpdateMonitor(Long id, MonitorDTO request){
        MonitorEntity monitor=monitor_repository.findById(id).orElseThrow(() -> new RuntimeException("Monitor not found"));
        monitor.setName_var(request.getMonitor_name());
        monitor.setUrl_var(request.getMonitor_url());
        monitor.setMonitor_type_var(request.getMonitor_type());
        monitor.setInterval_seconds_var(request.getInterval_seconds());
        monitor.setExpected_code_var(request.getExpected_status_code());
        monitor.setHttp_method_var(request.getMethod());
        monitor.setKeyword_var(request.getKeyword());
        monitor.setTimeout_var(request.getTimeout());
        return monitor_repository.save(monitor);
    }
}
