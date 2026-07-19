import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccordionContent, Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MonitorCardProps } from "@/types/Monitor";

function MonitorCard({name, url,status} : MonitorCardProps) {
    return (
        <Accordion defaultValue={[]} className="w-full">
            <AccordionItem value={name}>
                <AccordionTrigger>
                    <div className="flex w-full justify-between mr-4">
                        <span>{name}</span>
                        <span>{status}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p>{url}</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default MonitorCard;