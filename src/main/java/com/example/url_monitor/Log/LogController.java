package com.example.url_monitor.Log;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor

public class LogController {

    private final LogService log_service;

    @GetMapping
    public List<LogEntity> GetLogs() {return log_service.GetLogs();}
}