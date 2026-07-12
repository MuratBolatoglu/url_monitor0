package com.example.url_monitor.Log;

import com.example.url_monitor.Monitor.MonitorEntity;
import com.example.url_monitor.User.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository log_repository;
    public LogEntity CreateUpLog(MonitorEntity monitor){

        LogEntity log = LogEntity.builder()
                .status_var(monitor.getStatusVar())
                .status_code_var(monitor.getExpectedCodeVar())
                .response_time_ms_var(null)
                .error_message_var(null)
                .monitorVar(monitor)
                .message(monitor.getNameVar() + " UP again with code " +monitor.getExpectedCodeVar()+" at " + monitor.getLast_checked_at_var())
                .build();
        return log_repository.save(log);

    }
    public LogEntity CreateDownLog(MonitorEntity monitor){
        LogEntity log = LogEntity.builder()
                .status_var(monitor.getStatusVar())
                .status_code_var(monitor.getStatusCode())
                .response_time_ms_var(null)
                .error_message_var(null)
                .message(monitor.getNameVar() + " Down with code "+monitor.getStatusCode()+ " at " + monitor.getLast_checked_at_var())
                .monitorVar(monitor)
                .build();
        return log_repository.save(log);
    }
    public LogEntity CreateCreateLog(MonitorEntity monitor, UserEntity user){
        LogEntity log= LogEntity.builder()
                .message("Monitor created to "+ monitor.getUrlVar()+" bu user " + user.getEmailVar())
                .status_var("CREATED")
                .build();
        return log_repository.save(log);
    }
    public LogEntity CreateResponseTimeLog(int rt, MonitorEntity monitor){
        LogEntity log = LogEntity.builder()
                .monitorVar(monitor)
                .message("URL named "+ monitor.getUrlVar()+ " response time is " + Integer.toString(rt))
                .monitorVar(monitor)
                .status_var(monitor.getStatusVar())
                .response_time_ms_var(rt)
                .build();
        return log_repository.save(log);
    }
}
