package com.example.url_monitor.Monitor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MonitorRepository extends JpaRepository<MonitorEntity,Long> {
    Optional<MonitorEntity>findById(Long monitor_id) ;

}
