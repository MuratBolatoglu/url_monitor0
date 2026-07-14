package com.example.url_monitor.Log;

import com.example.url_monitor.Monitor.MonitorEntity;
import com.example.url_monitor.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository extends JpaRepository<LogEntity,Long> {
    void deleteAllByMonitorVar(MonitorEntity monitor);
    List<LogEntity> findAllByMonitorVar_UserVar(UserEntity user);
}
