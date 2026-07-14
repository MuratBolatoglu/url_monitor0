package com.example.url_monitor.Monitor;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/monitors")
@RequiredArgsConstructor
public class MonitorController {
    private final MonitorService monitor_service;

    @PostMapping
    public MonitorEntity CreateMonitor(@RequestBody MonitorDTO request){ return monitor_service.CreateMonitor(request); }

    @GetMapping("/{id}")
    public MonitorEntity GetMonitor(@PathVariable Long id){ return monitor_service.GetMonitor(id) ; }

    @GetMapping
    public List<MonitorEntity> GetAllMonitors(){ return monitor_service.GetAllMonitors() ; }

    @DeleteMapping("/{id}")
    public void DeleteMonitor(@PathVariable Long id) { monitor_service.DeleteMonitor(id);}

    @PutMapping("/{id}")
    public MonitorEntity UpdateMonitor(@PathVariable Long id, @RequestBody MonitorDTO request) {return monitor_service.UpdateMonitor(id,request);}

    @PostMapping("/{id}/check")
    public void CheckMonitor(@PathVariable long id){ monitor_service.CheckMonitor(id);}


}
