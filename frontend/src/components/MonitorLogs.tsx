import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Clock3,
    Server,
} from "lucide-react";

import type { Log } from "@/types/Log";

type MonitorLogsProps = {
    logs: Log[];
    loading: boolean;
};

function MonitorLogs({ logs, loading }: MonitorLogsProps) {
    if (loading) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
                <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Activity className="size-5 animate-pulse" />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-300">
                    Logs loading...
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Latest checks are being retrieved.
                </p>
            </div>
        );
    }

    if (logs.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
                <div className="flex size-11 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                    <Server className="size-5" />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-300">
                    No logs found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Logs will appear after the first monitor check.
                </p>
            </div>
        );
    }

    return (
        <ScrollArea className="h-72 rounded-xl border border-slate-800 bg-slate-950/40">
            <div className="space-y-3 p-3">
                {logs.map((log) => {
                    const statusStyle = getLogStatusStyle(log.status_var);

                    return (
                        <div
                            key={log.id_var}
                            className={`rounded-xl border p-4 transition hover:bg-slate-900/80 ${statusStyle.card}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${statusStyle.iconBackground}`}
                                    >
                                        {statusStyle.icon}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle.badge}`}
                                            >
                                                <span
                                                    className={`size-1.5 rounded-full ${statusStyle.dot}`}
                                                />

                                                {log.status_var}
                                            </span>

                                            {log.status_code_var !== null && (
                                                <span className="rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                                                    HTTP {log.status_code_var}
                                                </span>
                                            )}
                                        </div>

                                        {log.message && (
                                            <p className="mt-2 break-words text-sm text-slate-300">
                                                {log.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
                                    <Clock3 className="size-3.5" />

                                    <span>
                                        {new Date(
                                            log.checked_at_var
                                        ).toLocaleString("tr-TR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {log.response_time_ms_var !== null && (
                                    <LogMetric
                                        label="Response"
                                        value={`${log.response_time_ms_var} ms`}
                                    />
                                )}

                                {log.status_code_var !== null && (
                                    <LogMetric
                                        label="Status code"
                                        value={log.status_code_var}
                                    />
                                )}
                            </div>

                            {log.error_message_var && (
                                <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />

                                    <p className="break-words text-sm text-red-300">
                                        {log.error_message_var}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
}

type LogMetricProps = {
    label: string;
    value: string | number;
};

function LogMetric({ label, value }: LogMetricProps) {
    return (
        <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {label}
            </p>

            <p className="mt-0.5 text-xs font-semibold text-slate-300">
                {value}
            </p>
        </div>
    );
}

function getLogStatusStyle(status: string) {
    if (status === "UP") {
        return {
            card: "border-emerald-500/20 bg-emerald-500/[0.03]",
            badge:
                "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
            dot: "bg-emerald-400",
            iconBackground: "bg-emerald-500/10",
            icon: <CheckCircle2 className="size-4 text-emerald-400" />,
        };
    }

    if (status === "DOWN") {
        return {
            card: "border-red-500/20 bg-red-500/[0.03]",
            badge: "border-red-500/30 bg-red-500/10 text-red-400",
            dot: "bg-red-400",
            iconBackground: "bg-red-500/10",
            icon: <AlertCircle className="size-4 text-red-400" />,
        };
    }

    return {
        card: "border-amber-500/20 bg-amber-500/[0.03]",
        badge:
            "border-amber-500/30 bg-amber-500/10 text-amber-400",
        dot: "bg-amber-400",
        iconBackground: "bg-amber-500/10",
        icon: <Activity className="size-4 text-amber-400" />,
    };
}

export default MonitorLogs;