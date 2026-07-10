package com.example.url_monitor.Monitor;

import com.example.url_monitor.Log.LogService;
import com.example.url_monitor.MonitorCheck.CheckMonitorService;
import com.example.url_monitor.User.UserEntity;
import com.example.url_monitor.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitorService {
    private final MonitorRepository monitor_repository;
    private final UserRepository user_repository;
    private final CheckMonitorService monitor_check_service;
    private final LogService log_service;
    public MonitorEntity CreateMonitor(MonitorDTO request){
        MonitorEntity monitor = MonitorEntity.builder()
                .nameVar(request.getMonitor_name())
                .urlVar(request.getMonitor_url())
                .intervalSecondsVar(request.getInterval_seconds())
                .monitor_type_var(request.getMonitor_type())
                .expectedCodeVar(request.getExpected_status_code())
                .keyword_var(request.getKeyword())
                .http_method_var(request.getMethod())
                .timeoutVar(request.getTimeout())
                .statusCode(null)
                .build();

        UserEntity user = user_repository.findById(1L).orElseThrow(() -> new RuntimeException("User not found"));
        monitor.setUserVar(user);
        monitor = monitor_repository.save(monitor);
        log_service.CreateCreateLog(monitor,user);
        return monitor;
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
        monitor.setNameVar(request.getMonitor_name());
        monitor.setUrlVar(request.getMonitor_url());
        monitor.setMonitor_type_var(request.getMonitor_type());
        monitor.setIntervalSecondsVar(request.getInterval_seconds());
        monitor.setExpectedCodeVar(request.getExpected_status_code());
        monitor.setHttp_method_var(request.getMethod());
        monitor.setKeyword_var(request.getKeyword());
        monitor.setTimeoutVar(request.getTimeout());
        return monitor_repository.save(monitor);
    }

    public void CheckMonitor(Long id){
        MonitorEntity monitor= GetMonitor(id);
        monitor_check_service.CheckMonitor(monitor);
    }
}
