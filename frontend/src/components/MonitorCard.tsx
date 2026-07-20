import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MonitorCardProps } from "@/types/Monitor";

function MonitorCard(monitor : MonitorCardProps) {
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
                    <p>{monitor.urlVar}</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default MonitorCard;