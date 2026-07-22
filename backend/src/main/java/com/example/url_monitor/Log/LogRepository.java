package com.example.url_monitor.Log;

import com.example.url_monitor.Monitor.MonitorEntity;
import com.example.url_monitor.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LogRepository extends JpaRepository<LogEntity,Long> {
    void deleteAllByMonitorVar(MonitorEntity monitor);
    List<LogEntity> findAllByMonitorVar_UserVar(UserEntity user);
    @Query("""
        SELECT l
        FROM LogEntity l
        WHERE l.monitorVar.id_var = :monitorId
          AND l.monitorVar.userVar = :user
        ORDER BY l.checked_at_var DESC
    """)
    List<LogEntity> findAllByMonitorAndUser(
            @Param("monitorId") Long monitorId,
            @Param("user") UserEntity user
    );
}
