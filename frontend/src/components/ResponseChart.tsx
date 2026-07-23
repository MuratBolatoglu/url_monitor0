import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

import { Activity } from "lucide-react";
import type { Log } from "@/types/Log";

type ChartProps = {
    logs: Log[];
};

function ResponseChart({ logs }: ChartProps) {
    const chartConfig = {
        responseTime: {
            label: "Response Time",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    const chartData = logs
        .filter((log) => log.response_time_ms_var !== null)
        .toReversed()
        .map((log) => ({
            time: new Date(log.checked_at_var).toLocaleString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            fullTime: new Date(log.checked_at_var).toLocaleString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            responseTime: log.response_time_ms_var,
        }));

    if (chartData.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
                <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Activity className="size-6" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-300">
                    Henüz response time verisi yok
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    İlk kontrol tamamlandığında grafik burada görünecek.
                </p>
            </div>
        );
    }

    return (
        <ChartContainer
            config={chartConfig}
            className="h-64 w-full"
        >
            <AreaChart
                data={chartData}
                margin={{
                    top: 12,
                    right: 12,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient
                        id="responseTimeFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="var(--color-responseTime)"
                            stopOpacity={0.45}
                        />

                        <stop
                            offset="95%"
                            stopColor="var(--color-responseTime)"
                            stopOpacity={0.02}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    vertical={false}
                    stroke="rgb(51 65 85)"
                    strokeOpacity={0.5}
                    strokeDasharray="4 4"
                />

                <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    minTickGap={35}
                    tick={{
                        fill: "rgb(100 116 139)",
                        fontSize: 12,
                    }}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={58}
                    unit=" ms"
                    domain={["dataMin - 50", "dataMax + 50"]}
                    tick={{
                        fill: "rgb(100 116 139)",
                        fontSize: 12,
                    }}
                />

                <ChartTooltip
                    cursor={{
                        stroke: "rgb(129 140 248)",
                        strokeWidth: 1,
                        strokeDasharray: "4 4",
                    }}
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            className="border-slate-700 bg-slate-900 text-slate-100 shadow-xl"
                            labelFormatter={(_, payload) => {
                                return payload?.[0]?.payload?.fullTime ?? "";
                            }}
                            formatter={(value) => (
                                <div className="flex w-full min-w-44 items-center justify-between gap-5">
                                    <span className="text-slate-400">
                                        Response Time
                                    </span>

                                    <span className="font-semibold text-indigo-400">
                                        {value} ms
                                    </span>
                                </div>
                            )}
                        />
                    }
                />

                <Area
    dataKey="responseTime"
    type="monotone"
    fill="url(#responseTimeFill)"
    stroke="#818cf8"
    strokeWidth={2.5}
    dot={false}
    activeDot={{
        r: 5,
        strokeWidth: 3,
        stroke: "#0f172a",
        fill: "#818cf8",
    }}
/>
            </AreaChart>
        </ChartContainer>
    );
}

export default ResponseChart;