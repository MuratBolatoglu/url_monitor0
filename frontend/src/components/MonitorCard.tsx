import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import AddMonitorDialog from "@/components/AddMonitorDialog";
import { Button } from "@/components/ui/button";
import {
    Activity,
    Clock3,
    Globe2,
    Trash2,
} from "lucide-react";

import type { Monitor } from "@/types/Monitor";
import type { Log } from "@/types/Log";

import api from "@/services/api";
import { useEffect, useState } from "react";

import MonitorLogs from "@/components/MonitorLogs";
import ResponseChart from "@/components/ResponseChart";

type MonitorCardProps = {
    monitor: Monitor;
    onMonitorDeleted: () => Promise<void>;
    onMonitorEdited: () => Promise<void>;
};

function MonitorCard({
    monitor,
    onMonitorDeleted,
    onMonitorEdited,
}: MonitorCardProps) {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);

    useEffect(() => {
        fetchLogs();

        const intervalId = setInterval(() => {
            fetchLogs();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [monitor.id_var]);

    async function deleteMonitor() {
        try {
            await api.delete(`/monitors/${monitor.id_var}`);
            await onMonitorDeleted();
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchLogs() {
        try {
            setLoadingLogs(true);

            const response = await api.get(
                `/logs/monitor/${monitor.id_var}`
            );

            setLogs(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingLogs(false);
        }
    }

    const statusStyle = getStatusStyle(monitor.statusVar);

    return (
        <Accordion
            defaultValue={[]}
            className="w-full"
            onValueChange={(value) => {
                if (value.includes(String(monitor.id_var))) {
                    fetchLogs();
                }
            }}
        >
            <AccordionItem
                value={String(monitor.id_var)}
                className={`overflow-hidden rounded-2xl border bg-slate-900 transition hover:border-slate-700 ${statusStyle.border}`}
            >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="mr-4 flex w-full items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                            <div
                                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${statusStyle.iconBackground}`}
                            >
                                <Globe2 className={`size-5 ${statusStyle.iconColor}`} />
                            </div>

                            <div className="min-w-0 text-left">
                                <h3 className="truncate text-base font-semibold text-slate-100">
                                    {monitor.nameVar}
                                </h3>

                                <p className="mt-1 truncate text-sm font-normal text-slate-400">
                                    {monitor.urlVar}
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-4">
                            <div className="hidden text-right sm:block">
                                <p className="text-xs font-normal text-slate-500">
                                    Last checked
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-300">
                                    {monitor.last_checked_at_var
                                        ? new Date(
                                              monitor.last_checked_at_var
                                          ).toLocaleTimeString()
                                        : "Not checked"}
                                </p>
                            </div>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.badge}`}
                            >
                                <span
                                    className={`size-2 rounded-full ${statusStyle.dot}`}
                                />

                                {monitor.statusVar}
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="border-t border-slate-800 px-5 pb-5">
                    <div className="grid items-start gap-5 pt-5 lg:grid-cols-[0.9fr_2fr]">
                        <div className="space-y-4">
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Activity className="size-4 text-indigo-400" />

                                    <h3 className="font-semibold text-slate-200">
                                        Monitor Details
                                    </h3>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                    <MonitorDetail
                                        label="URL"
                                        value={monitor.urlVar}
                                    />

                                    <MonitorDetail
                                        label="Monitor Type"
                                        value={monitor.monitor_type_var}
                                    />

                                    {monitor.monitor_type_var === "HTTP" && (
                                        <>
                                            <MonitorDetail
                                                label="HTTP Method"
                                                value={
                                                    monitor.http_method_var ?? "-"
                                                }
                                            />

                                            <MonitorDetail
                                                label="Expected Status"
                                                value={
                                                    monitor.expectedCodeVar ?? "-"
                                                }
                                            />

                                            <MonitorDetail
                                                label="Keyword"
                                                value={
                                                    monitor.keyword_var || "-"
                                                }
                                            />
                                        </>
                                    )}

                                    <MonitorDetail
                                        label="Interval"
                                        value={`${monitor.intervalSecondsVar} seconds`}
                                    />

                                    <MonitorDetail
                                        label="Timeout"
                                        value={`${monitor.timeoutVar} ms`}
                                    />

                                    <MonitorDetail
                                        label="Status Code"
                                        value={monitor.statusCode ?? "-"}
                                    />

                                    <MonitorDetail
                                        label="Last Checked"
                                        value={
                                            monitor.last_checked_at_var
                                                ? new Date(
                                                      monitor.last_checked_at_var
                                                  ).toLocaleString()
                                                : "Not checked yet"
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="min-w-0 space-y-5">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-slate-200">
                                            Response Time
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Latest response measurements
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-400">
                                        <Clock3 className="size-4" />
                                        Live
                                    </div>
                                </div>

                                <ResponseChart logs={logs} />
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2">
                                <AddMonitorDialog
                                    mode="edit"
                                    onSuccess={onMonitorEdited}
                                    monitor={monitor}
                                />

                                <Button
                                    variant="outline"
                                    onClick={deleteMonitor}
                                    aria-label="Delete monitor"
                                    className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                                >
                                    <Trash2 className="mr-2 size-4" />
                                    Delete
                                </Button>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                                <div className="mb-4">
                                    <h3 className="font-semibold text-slate-200">
                                        Recent Logs
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Latest availability checks
                                    </p>
                                </div>

                                <MonitorLogs
                                    logs={logs}
                                    loading={loadingLogs}
                                />
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

type MonitorDetailProps = {
    label: string;
    value: string | number;
};

function MonitorDetail({
    label,
    value,
}: MonitorDetailProps) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {label}
            </p>

            <p className="mt-1.5 break-all text-sm font-medium text-slate-200">
                {value}
            </p>
        </div>
    );
}

function getStatusStyle(status: string) {
    if (status === "UP") {
        return {
            border: "border-emerald-500/30",
            badge:
                "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
            dot: "bg-emerald-400",
            iconBackground: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
        };
    }

    if (status === "DOWN") {
        return {
            border: "border-red-500/30",
            badge: "border-red-500/30 bg-red-500/10 text-red-400",
            dot: "bg-red-400",
            iconBackground: "bg-red-500/10",
            iconColor: "text-red-400",
        };
    }

    return {
        border: "border-amber-500/30",
        badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        dot: "bg-amber-400",
        iconBackground: "bg-amber-500/10",
        iconColor: "text-amber-400",
    };
}

export default MonitorCard;