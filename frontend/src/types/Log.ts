export interface Log {
    id_var: number;
    status_var: string;
    status_code_var: number | null;
    response_time_ms_var: number | null;
    error_message_var: string | null;
    checked_at_var: string;
    message: string;
}