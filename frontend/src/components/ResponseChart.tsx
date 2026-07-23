import   {ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import {AreaChart,CartesianGrid, XAxis,YAxis,Area} from "recharts"

import type { Log } from "@/types/Log";
type ChartProps = {
    logs : Log[]
    
}
function ResponseChart({logs}: ChartProps){
    const chartConfig = {
        responseTime: {
            label: "Response Time",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    const chartData = logs
        .filter((log) => log.response_time_ms_var !== null)
        .reverse()
        .map((log) => ({
            time: new Date(log.checked_at_var).toLocaleString("en-EN", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            responseTime: log.response_time_ms_var,
        }));

    if (chartData.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Henüz response time verisi yok.
            </div>
        );
    }
    return(
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={chartData} margin={{top: 10,right: 10,left: 0,bottom: 0,}}>
                <defs>
                    <linearGradient id="responseTimeFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-responseTime)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-responseTime)" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />

                <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={30}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={55}
                    unit=" ms"
                    domain={["dataMin - 50", "dataMax + 50"]}
                />

                <ChartTooltip
                    cursor={ {strokeDasharray: "3 3" }}
                    content={
                        <ChartTooltipContent indicator="dot" formatter={(value) => (
                                <div className="flex w-full justify-between gap-4">
                                    <span>Response Time</span>
                                    <span className="font-medium">{value} ms</span>
                                </div>
                            )}/>}/>
                <Area
                    dataKey="responseTime"
                    type="monotone"
                    fill="url(#responseTimeFill)"
                    stroke="var(--color-responseTime)"
                    strokeWidth={2}
                />
            </AreaChart>
        </ChartContainer>
    );        
}

export default ResponseChart;
