import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Monitor } from "@/types/Monitor";

function MonitorCard(monitor : Monitor) {
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
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Method</span>
                            <span>{monitor.http_method_var}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Interval</span>
                            <span>{monitor.intervalSecondsVar}s</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Timeout</span>
                            <span>{monitor.timeoutVar} ms</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status Code</span>
                            <span>{monitor.statusCode ?? "-"}</span>
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
function MonitorDetail({label,value,}: MonitorDetailProps) {
    return (
        <div className="rounded-md border p-3">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 font-medium break-all">{value}</p>
        </div>
    );
}
export default MonitorCard;