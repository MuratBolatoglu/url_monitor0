package com.example.url_monitor.MonitorCheck;

import com.example.url_monitor.Log.LogEntity;
import com.example.url_monitor.Log.LogRepository;
import com.example.url_monitor.Log.LogService;
import com.example.url_monitor.Monitor.MonitorEntity;
import com.example.url_monitor.Monitor.MonitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.net.InetAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CheckMonitorService {

    private final MonitorRepository monitor_repository;
    private final LogRepository log_repository;
    private final LogService log_service;

    public void CheckMonitor(MonitorEntity monitor){
        switch(monitor.getMonitor_type_var()){
            case HTTP:
                CheckHttp(monitor);
                break;
            case DNS:
                CheckDns(monitor);
                break;
            case PING:
                CheckPing(monitor);
                break;
        }
    }
    public void CheckHttp(MonitorEntity monitor) {
        String prev=monitor.getStatusVar();
        try {
            HttpClient client = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NORMAL).build();
            HttpRequest.Builder builder = HttpRequest.newBuilder().uri(URI.create(monitor.getUrlVar())).timeout(Duration.ofSeconds(monitor.getTimeoutVar()));

            ObjectMapper mapper = new ObjectMapper();
            if(monitor.getRequestHeadersVar() != null && !monitor.getRequestHeadersVar().isBlank()){
                Map<String,String> headers = mapper.readValue(monitor.getRequestHeadersVar(), new TypeReference<Map<String, String>>() {});
                headers.forEach(builder::header);
            }

            switch(monitor.getHttp_method_var()){
                case GET:
                    builder.GET();
                    break;
                case PUT:
                    builder.PUT(HttpRequest.BodyPublishers.ofString(monitor.getRequestBodyVar() == null ? "" : monitor.getRequestBodyVar()));
                    break;
                case HEAD:
                    builder.method("HEAD",HttpRequest.BodyPublishers.noBody());
                    break;
                case POST:
                    builder.POST(HttpRequest.BodyPublishers.ofString(monitor.getRequestBodyVar()==null ? "" : monitor.getRequestBodyVar()));
                    break;
                case PATCH:
                    builder.method("PATCH" , HttpRequest.BodyPublishers.ofString(monitor.getRequestBodyVar()==null ? "" : monitor.getRequestBodyVar()));
                    break;
                case DELETE:
                    builder.DELETE();
                    break;
                case OPTIONS:
                    builder.method("OPTIONS",HttpRequest.BodyPublishers.noBody());
                    break;
            }
            HttpRequest request = builder.build();
            long start = System.currentTimeMillis();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            long end = System.currentTimeMillis();

            int responseTime = (int) (end - start);
            int statusCode = response.statusCode();
            if (statusCode == monitor.getExpectedCodeVar())  monitor.setStatusVar("UP");
            else monitor.setStatusVar("DOWN");
            if(!monitor.getKeyword_var().isBlank() && monitor.getKeyword_var() != null){
                String body= response.body();
                if(!body.contains(monitor.getKeyword_var())) monitor.setStatusVar("DOWN");
            }
            monitor.setStatusCode(statusCode);
            monitor.setLast_checked_at_var(LocalDateTime.now());
            log_service.CreateResponseTimeLog(responseTime,monitor);
            monitor_repository.save(monitor);
        } catch (Exception e) {
            e.printStackTrace();
            monitor.setStatusVar("DOWN");
            monitor.setStatusCode(null);
            monitor.setLast_checked_at_var(LocalDateTime.now());
            monitor_repository.save(monitor);
            LogEntity log = LogEntity.builder()
                    .status_var("DOWN")
                    .status_code_var(null)
                    .response_time_ms_var(null)
                    .error_message_var(e.getMessage())
                    .monitorVar(monitor)
                    .build();
            log_repository.save(log);
        }
        if( !prev.equals(monitor.getStatusVar())){
            if(monitor.getStatusVar().equals("DOWN")) log_service.CreateDownLog(monitor);
            else if(monitor.getStatusVar().equals("UP")) log_service.CreateUpLog(monitor);
        }

    }

    public void CheckDns(MonitorEntity monitor){
        String prev=monitor.getStatusVar();
        try {
            String host = URI.create(monitor.getUrlVar()).getHost();
            if (host == null)  host = monitor.getUrlVar();

            long start = System.currentTimeMillis();
            InetAddress.getByName(host);
            long end=System.currentTimeMillis();
            int responseTime= (int) (end-start);

            monitor.setStatusVar("UP");
            monitor.setStatusCode(null);
            monitor.setLast_checked_at_var(LocalDateTime.now());

            log_service.CreateResponseTimeLog(responseTime,monitor);
            monitor_repository.save(monitor);


        }catch (Exception e){
            monitor.setStatusVar("DOWN");
            monitor.setStatusCode(null);
            monitor.setLast_checked_at_var(LocalDateTime.now());

            monitor_repository.save(monitor);
        }
        if( !prev.equals(monitor.getStatusVar())){
            if(monitor.getStatusVar().equals("DOWN")) log_service.CreateDownLog(monitor);
            else if(monitor.getStatusVar().equals("UP")) log_service.CreateUpLog(monitor);
        }
    }

    public void CheckPing(MonitorEntity monitor){
        String prev=monitor.getStatusVar();
        try{
            String host= URI.create(monitor.getUrlVar()).getHost();
            if(host==null) host=monitor.getUrlVar();
            InetAddress address = InetAddress.getByName(host);

            long start=System.currentTimeMillis();
            boolean reach = address.isReachable(monitor.getTimeoutVar() * 1000);
            long end = System.currentTimeMillis();
            int responseTime = (int) (end-start);

            if(reach) monitor.setStatusVar("UP");
            else monitor.setStatusVar("DOWN");


            monitor.setStatusCode(null);
            monitor.setLast_checked_at_var(LocalDateTime.now());
            log_service.CreateResponseTimeLog(responseTime,monitor);

            monitor_repository.save(monitor);

        }catch (Exception e){
            monitor.setStatusVar("DOWN");
            monitor.setStatusCode(null);
            monitor.setLast_checked_at_var(LocalDateTime.now());
            monitor_repository.save(monitor);
        }

        if( !prev.equals(monitor.getStatusVar())){
            if(monitor.getStatusVar().equals("DOWN")) log_service.CreateDownLog(monitor);
            else if(monitor.getStatusVar().equals("UP")) log_service.CreateUpLog(monitor);
        }

    }
}