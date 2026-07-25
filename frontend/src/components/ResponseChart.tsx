import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";
import type { Log } from "@/types/Log";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TimeRange = "Today" | "Last-30-days" | "Last-7-days" | "All";

type ChartProps = {
    logs: Log[];
};

function filterLogsByTimeRange(logs: Log[], timeRange: TimeRange) {
    if (timeRange === "All") {return logs;}
    const now = new Date();
    const startDate = new Date(now);
    if (timeRange === "Today") {startDate.setHours(0, 0, 0, 0);}
    if (timeRange === "Last-7-days") {startDate.setDate(now.getDate() - 7);}
    if (timeRange === "Last-30-days") {startDate.setDate(now.getDate() - 30);}
    return logs.filter((log) => {
        const checkedAt = new Date(log.checked_at_var);
        return checkedAt >= startDate && checkedAt <= now;
    });
}

function ResponseChart({ logs }: ChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>("Today");
    const timeRangeOptions: {
        value: TimeRange;
        label: string;
    }[] = [{ value: "Today", label: "Today" },{ value: "Last-7-days", label: "Last 7 days" },{ value: "Last-30-days", label: "Last 30 days" },{ value: "All", label: "All time" },];

    const chartConfig = {
        responseTime: {label: "Response Time",color: "var(--chart-1)",},
    } satisfies ChartConfig;

    const filteredLogs = filterLogsByTimeRange(logs, timeRange);

    const chartData = filteredLogs
        .filter((log) => log.response_time_ms_var !== null).toReversed()
        .map((log) => ({
            time: new Date(log.checked_at_var).toLocaleString("tr-TR", {hour: "2-digit",minute: "2-digit",second: "2-digit",}),
            fullTime: new Date(log.checked_at_var).toLocaleString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric",hour: "2-digit",minute: "2-digit",second: "2-digit",}),
            responseTime: log.response_time_ms_var,
        }));
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-300">Response history</p>
                    <p className="mt-1 text-xs text-slate-500">
                        {timeRangeOptions.find((option) => option.value === timeRange)?.label}
                    </p>
                </div>

                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                    <SelectTrigger className="w-44 border-slate-700 bg-slate-950 text-slate-200">
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>

                    <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                        {timeRangeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="focus:bg-slate-800 focus:text-white">
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {chartData.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400"><Activity className="size-6" /></div>
                    <p className="mt-1 text-xs text-slate-500">Selected time range has no response data.</p>
                </div>
            ) : (
                <ChartContainer config={chartConfig} className="h-64 w-full">
                    <AreaChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="responseTimeFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.45} />
                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} stroke="rgb(51 65 85)" strokeOpacity={0.5} strokeDasharray="4 4"/>
                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} minTickGap={35} tick={{fill: "rgb(100 116 139)",fontSize: 12}}/>
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={58} unit=" ms" domain={["dataMin - 50", "dataMax + 50"]} tick={{fill: "rgb(100 116 139)",fontSize: 12}}/>
                        <ChartTooltip
                            cursor={{stroke: "rgb(129 140 248)",strokeWidth: 1,strokeDasharray: "4 4"}}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    className="border-slate-700 bg-slate-900 text-slate-100 shadow-xl"
                                    labelFormatter={(_, payload) => {
                                        return payload?.[0]?.payload?.fullTime ?? "";
                                    }}
                                    formatter={(value) => (
                                        <div className="flex w-full min-w-44 items-center justify-between gap-5">
                                            <span className="text-slate-400">Response Time</span>
                                            <span className="font-semibold text-indigo-400">{value} ms</span>
                                        </div>
                                    )}
                                />
                            }
                        />
                        <Area dataKey="responseTime" type="monotone" fill="url(#responseTimeFill)"
                            stroke="#818cf8" strokeWidth={2.5} dot={false} activeDot={{r: 5,strokeWidth: 3,stroke: "#0f172a",fill: "#818cf8",}}/>
                    </AreaChart>
                </ChartContainer>
            )}
        </div>
    );
}

export default ResponseChart;