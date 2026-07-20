import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Monitor } from "@/types/Monitor";
import {Button} from "@/components/ui/button";
import { Cog, Trash2 } from "lucide-react";
import fetchMonitors from "@/pages/dashboard";
import api from "@/services/api";
function MonitorCard({onMonitorDeleted, ...monitor}: MonitorCardProps) {
    async function deleteMonitor(monitorId: number) {
    try {
        await api.delete(`/monitors/${monitorId}`);
        await onMonitorDeleted();
    }catch (error) {
        console.error(error); 
    }
}
    return (
        <Accordion defaultValue={[]} className="w-full">
            <AccordionItem value={monitor.nameVar}>
                <AccordionTrigger>
                    <div className="flex w-full justify-between mr-4">
                        <span>{monitor.nameVar}</span>
                        <span>{monitor.statusVar}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid gap-6 pt-3 md:grid-cols-[1fr_2fr]">
                        <div className="space-y-2">
                            <MonitorDetail label="URL" value={monitor.urlVar}/>
                            <MonitorDetail label="Monitor Type" value={monitor.monitor_type_var}/>
                            {monitor.monitor_type_var === "HTTP" && (
                                <>
                                    <MonitorDetail label="HTTP Method" value={monitor.http_method_var ?? "-"}/>
                                    <MonitorDetail label="Expected Status" value={monitor.expectedCodeVar ?? "-"}/>
                                    <MonitorDetail label="Keyword" value={monitor.keyword_var || "-"}/>
                                </>
                            )}
                            <MonitorDetail label="Interval "value={`${monitor.intervalSecondsVar} seconds`}/>
                            <MonitorDetail label="Timeout" value={`${monitor.timeoutVar} ms`}/>
                            <MonitorDetail label="Status Code" value={monitor.statusCode ?? "-"}/>
                            <MonitorDetail label="Last Checked" value={monitor.last_checked_at_var? new Date(monitor.last_checked_at_var).toLocaleString() : "Not checked yet"}/>
                        </div>
                        <div className="min-h-56 rounded-lg border p-4">
                            <h3 className="mb-4 font-semibold">Response Time</h3>
                            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                                Chart gelecek
                            </div>
                        </div>
                    </div>
                    <div className=" justify-end mt-4 flex w-full gap-2">
                        <Button size="icon"><Cog/></Button>
                        <Button size="icon" onClick={() => deleteMonitor(monitor.id_var)}><Trash2/></Button>  
                    </div>
                    
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

type MonitorCardProps = Monitor & {
    onMonitorDeleted: () => Promise<void>;
    onMonitorUpdated?: () => Promise<void>;
    onMonitorCreated: () => Promise<void>;
};

type MonitorDetailProps = {
    label: string;
    value: string | number;
};
function MonitorDetail({label,value,}: MonitorDetailProps) {
    return (
        <div className="rounded-md border p-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 font-medium break-all">{value}</p>
        </div>
    );
}
export default MonitorCard;