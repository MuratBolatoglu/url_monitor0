package com.example.url_monitor.MonitorCheck;

import com.example.url_monitor.Log.LogEntity;
import com.example.url_monitor.Log.LogRepository;
import com.example.url_monitor.Log.LogService;
import com.example.url_monitor.Monitor.MonitorEntity;
import com.example.url_monitor.Monitor.MonitorRepository;
import com.example.url_monitor.Monitor.MonitorType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CheckMonitorService {

    private final MonitorRepository monitor_repository;
    private final LogRepository log_repository;
    private final LogService log_service;

    public void CheckMonitor(MonitorEntity monitor) {
        String prev=monitor.getStatusVar();
        try {
            HttpClient client = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NORMAL).build();
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(monitor.getUrlVar())).timeout(Duration.ofSeconds(monitor.getTimeoutVar())).GET().build();

            long start = System.currentTimeMillis();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            long end = System.currentTimeMillis();

            int responseTime = (int) (end - start);
            int statusCode = response.statusCode();
            if (statusCode == monitor.getExpectedCodeVar())  monitor.setStatusVar("UP");
            else monitor.setStatusVar("DOWN");
            monitor.setStatusCode(statusCode);
            monitor.setLast_checked_at_var(LocalDateTime.now());
            log_service.CreateResponseTimeLog(responseTime,monitor);
            monitor_repository.save(monitor);
        } catch (Exception e) {
            e.printStackTrace();
            monitor.setStatusVar("DOWN");
            monitor.setLast_checked_at_var(LocalDateTime.now());
            monitor_repository.save(monitor);
            LogEntity log = LogEntity.builder()
                    .status_var("DOWN")
                    .status_code_var(null)
                    .response_time_ms_var(null)
                    .error_message_var(e.getMessage())
                    .monitor_var(monitor)
                    .build();
            log_repository.save(log);
        }
        if( !prev.equals(monitor.getStatusVar())){
            if(monitor.getStatusVar().equals("DOWN")) log_service.CreateDownLog(monitor);
            else if(monitor.getStatusVar().equals("UP")) log_service.CreateUpLog(monitor);
        }

    }
}