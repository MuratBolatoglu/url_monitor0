package com.example.url_monitor.Log;

import com.example.url_monitor.Monitor.MonitorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<LogEntity,Long> {
    void deleteAllByMonitorVar(MonitorEntity monitor);
}
