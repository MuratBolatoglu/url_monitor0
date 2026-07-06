package com.example.url_monitor.Monitor;

import lombok.Data;

@Data
public class MonitorDTO {

   private String monitor_name;

   private String monitor_url;

   private MonitorType monitor_type;

   private Integer interval_seconds;

   // HTTP monitorleri için
   private HttpMethod method;
   private Integer expected_status_code;
   private String keyword;
   private Integer timeout;

   // İleride eklenecek
   // private String request_body;
   // private String request_headers;
}