package com.example.url_monitor.Monitor;

import lombok.Data;

@Data
public class MonitorDTO {
   private String monitor_name;
   private String monitor_url;
   private Integer interval_seconds;
}
