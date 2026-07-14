package com.example.url_monitor.Monitor;

import com.example.url_monitor.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonitorRepository extends JpaRepository<MonitorEntity,Long> {
    List<MonitorEntity> findByUserVar(UserEntity user);
    List<MonitorEntity> findByEnabledVarTrue();
    List<MonitorEntity>findAllByUserVar(UserEntity user);
}
