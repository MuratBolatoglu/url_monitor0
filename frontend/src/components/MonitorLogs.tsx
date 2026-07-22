import { ScrollArea } from "@/components/ui/scroll-area";
import type { Log } from "@/types/Log";

type MonitorLogsProps = {
    logs: Log[];
    loading: boolean;
};

function MonitorLogs({ logs, loading }: MonitorLogsProps) {
    if (loading) {
        return (<div className="flex h-40 items-center justify-center text-sm text-muted-foreground">Logs loading...</div>
        );
    }

    if (logs.length === 0) {
        return (<div className="flex h-40 items-center justify-center text-sm text-muted-foreground">No logs found.</div>);
    }

    return (
        <ScrollArea className="h-64 rounded-md border">
            <div className="space-y-2 p-3">
                {logs.map((log) => (
                    <div key={log.idVar}className="rounded-md border p-3">
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">
                                {log.status_var}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                {new Date(log.checked_at_var).toLocaleString()}
                            </span>
                        </div>

                        <p className="mt-2 text-sm">{log.message}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                            {log.status_code_var !== null && (
                                <span>Status code: {log.status_code_var}</span>
                            )}
                            {log.response_time_ms_var !== null && (
                                <span>Response time: {log.response_time_ms_var} ms </span>
                            )}
                        </div>

                        {log.error_message_var && (
                            <p className="mt-2 text-sm text-red-500">{log.error_message_var}</p>
                        )}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}

export default MonitorLogs;