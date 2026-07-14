package com.example.url_monitor.Monitor;

import com.example.url_monitor.Exceptions.BadRequestException;
import com.example.url_monitor.Exceptions.ForbiddenException;
import com.example.url_monitor.Exceptions.NotFoundException;
import com.example.url_monitor.Log.LogRepository;
import com.example.url_monitor.Log.LogService;
import com.example.url_monitor.MonitorCheck.CheckMonitorService;
import com.example.url_monitor.User.UserEntity;
import com.example.url_monitor.User.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MonitorService {
    private final MonitorRepository monitor_repository;
    private final UserRepository user_repository;
    private final LogRepository log_repository;
    private final CheckMonitorService monitor_check_service;
    private final LogService log_service;
    public MonitorEntity CreateMonitor(MonitorDTO request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();

        if (request.getMonitor_type() == MonitorType.HTTP) {
            String url = request.getMonitor_url();
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                throw new BadRequestException("HTTP monitor URL must start with http:// or https://");
            }
        }
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
                .requestBodyVar(request.getRequest_body())
                .requestHeadersVar(request.getRequest_headers())
                .build();

        monitor.setUserVar(user);
        monitor = monitor_repository.save(monitor);
        log_service.CreateCreateLog(monitor,user);
        return monitor;
    }
    public MonitorEntity GetMonitor(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();

        MonitorEntity monitor = monitor_repository.findById(id).orElseThrow(() -> new NotFoundException("Monitor not found"));

        if (!monitor.getUserVar().getId().equals(user.getId())) throw new ForbiddenException("Forbidden");;

        return monitor;
    }
    public List<MonitorEntity> GetAllMonitors(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return monitor_repository.findAllByUserVar(user);
    }
    public void DeleteMonitor(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        MonitorEntity monitor = GetMonitor(id);
        if (!monitor.getUserVar().getId().equals(user.getId())) throw new ForbiddenException("Forbidden");;
        log_repository.deleteAllByMonitorVar(monitor);
        monitor_repository.deleteById(id);
    }

    public MonitorEntity UpdateMonitor(Long id, MonitorDTO request){

        if (request.getMonitor_type() == MonitorType.HTTP) {
            String url = request.getMonitor_url();
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                throw new RuntimeException("HTTP monitor URL must start with http:// or https://");
            }
        }
        MonitorEntity monitor=monitor_repository.findById(id).orElseThrow(() -> new NotFoundException("Monitor not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        if (!monitor.getUserVar().getId().equals(user.getId())) throw new ForbiddenException("Forbidden");;

        monitor.setNameVar(request.getMonitor_name());
        monitor.setUrlVar(request.getMonitor_url());
        monitor.setMonitor_type_var(request.getMonitor_type());
        monitor.setIntervalSecondsVar(request.getInterval_seconds());
        monitor.setExpectedCodeVar(request.getExpected_status_code());
        monitor.setHttp_method_var(request.getMethod());
        monitor.setKeyword_var(request.getKeyword());
        monitor.setTimeoutVar(request.getTimeout());
        monitor.setRequestBodyVar(request.getRequest_body());
        monitor.setRequestHeadersVar(request.getRequest_headers());
        return monitor_repository.save(monitor);
    }

    public void CheckMonitor(Long id){
        MonitorEntity monitor= GetMonitor(id);
        monitor_check_service.CheckMonitor(monitor);
    }
}
