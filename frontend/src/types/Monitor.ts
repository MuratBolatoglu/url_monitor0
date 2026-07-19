export interface MonitorCardProps {
    id_var: number;

    nameVar: string;
    urlVar: string;
    statusVar: string;

    intervalSecondsVar: number;
    createdAtVar: string;
    statusCode: number | null;
    last_checked_at_var: string | null;

    monitor_type_var: "HTTP" | "PING" | "DNS";
    http_method_var: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | null;

    expectedCodeVar: number | null;
    keyword_var: string | null;

    timeoutVar: number;
    enabledVar: boolean;

    requestBodyVar: string | null;
    requestHeadersVar: string | null;
}