import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AddMonitorDialog from "@/components/AddMonitorDialog";
import { Button } from "@/components/ui/button";
import {  Trash2 } from "lucide-react";
import type { Monitor } from "@/types/Monitor";
import api from "@/services/api";
import { useState } from "react";
import type { Log } from "@/types/Log";
import MonitorLogs from "@/components/MonitorLogs";

type MonitorCardProps ={
    monitor: Monitor;
    onMonitorDeleted: () => Promise<void>;
    onMonitorEdited: () => Promise<void>;
}

function MonitorCard({ monitor, onMonitorDeleted, onMonitorEdited }: MonitorCardProps) {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);

    async function deleteMonitor() {
        try {
            await api.delete(`/monitors/${monitor.id_var}`);
            await onMonitorDeleted();
        }catch (error) {
            console.error(error);
        }
    }

    async function fetchLogs() {
        try{
            setLoadingLogs(true);
            const response = await api.get(`/logs/monitor/${monitor.id_var}`);
            setLogs(response.data);
        }catch (error) {
            console.error(error);
        } finally {
            setLoadingLogs(false);
        }
    }

    return (
        <Accordion defaultValue={[]} className="w-full" onValueChange={(value) => {if (value.includes(String(monitor.id_var))) {fetchLogs();}}}>
            <AccordionItem value={String(monitor.id_var)}>
                <AccordionTrigger>
                    <div className="mr-4 flex w-full justify-between">
                        <span>{monitor.nameVar}</span>
                        <span>{monitor.statusVar}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid gap-4 pt-3 md:grid-cols-[1fr_2fr]">
                        <div className="space-y-2">
                            <MonitorDetail label="URL" value={monitor.urlVar} />
                            <MonitorDetail label="Monitor Type" value={monitor.monitor_type_var} />
                            {monitor.monitor_type_var === "HTTP" && (
                                <>
                                    <MonitorDetail label="HTTP Method" value={monitor.http_method_var ?? "-"} />
                                    <MonitorDetail label="Expected Status" value={monitor.expectedCodeVar ?? "-"} />
                                    <MonitorDetail label="Keyword" value={monitor.keyword_var || "-"} />
                                </>
                            )}
                            <MonitorDetail label="Interval" value={`${monitor.intervalSecondsVar} seconds`} />
                            <MonitorDetail label="Timeout" value={`${monitor.timeoutVar} ms`} />
                            <MonitorDetail label="Status Code" value={monitor.statusCode ?? "-"} />
                            <MonitorDetail label="Last Checked" value={monitor.last_checked_at_var ? new Date(monitor.last_checked_at_var).toLocaleString() : "Not checked yet"} />
                        </div>
                        <div className="min-h-40 rounded-lg border p-3">
                            <h3 className="mb-2 font-semibold">Response Time</h3>
                            <div className="flex h-28 items-center justify-center text-sm text-muted-foreground">Chart gelecek</div>
                        </div>
                    </div>
                    <div className="mt-3 flex w-full justify-end gap-2">
                        <AddMonitorDialog mode="edit" onSuccess={onMonitorEdited} monitor={monitor} />
                        <Button onClick={()=>deleteMonitor()} size="icon" aria-label="Delete monitor" className="hover:bg-red-300"><Trash2 color="red" /></Button>
                    </div>
                    <div className="mt-4">
                        <h3 className="mb-2 font-semibold">Logs</h3>
                        <MonitorLogs logs={logs} loading={loadingLogs}/>
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

function MonitorDetail({ label, value }: MonitorDetailProps) {
    return (
        <div className="rounded-md border p-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 break-all font-medium">{value}</p>
        </div>
    );
}

export default MonitorCard;