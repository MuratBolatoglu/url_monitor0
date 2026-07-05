package com.example.url_monitor.Monitor;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/monitors")
@RequiredArgsConstructor
public class MonitorController {
    private final MonitorService monitor_service;
    @PostMapping
    public MonitorEntity CreateMonitor(@RequestBody MonitorDTO request){ return monitor_service.CreateMonitor(request); }

}
