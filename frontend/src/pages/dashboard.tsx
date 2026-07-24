import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Activity,CircleCheckBig,CircleX,Gauge,LogOut,} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddMonitorDialog from "@/components/AddMonitorDialog";
import MonitorCard from "@/components/MonitorCard";
import api from "@/services/api";
import type { Monitor } from "@/types/Monitor";

function Dashboard() {
    const navigate = useNavigate();
    const [monitors, setMonitors] = useState<Monitor[]>([]);
    const [loading, setLoading] = useState(true);
    async function fetchMonitors() {
        try {
            const response = await api.get("/monitors");
            setMonitors(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMonitors();
        const intervalId = setInterval(() => {
            fetchMonitors();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const upMonitorCount = monitors.filter((monitor) => monitor.statusVar === "UP").length;
    const downMonitorCount = monitors.filter((monitor) => monitor.statusVar === "DOWN").length;
    const pendingMonitorCount = monitors.length - upMonitorCount - downMonitorCount;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                                <Activity className="size-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Monitor Dashboard</h1>
                                <p className="text-sm text-slate-400">Keep track of your services real-time</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AddMonitorDialog mode="add" onSuccess={fetchMonitors}/>
                        <Button variant="outline" onClick={handleLogout} className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white">
                            <LogOut className="mr-2 size-4" />Logout
                        </Button>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-6 py-8">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard title="Total Monitors" value={monitors.length} description="All configured monitors" icon={<Gauge className="size-5" />} iconClassName="bg-indigo-500/15 text-indigo-400"/>
                    <SummaryCard title="Operational" value={upMonitorCount} description="Currently online" icon={<CircleCheckBig className="size-5" />} iconClassName="bg-emerald-500/15 text-emerald-400"/>                                                                                               
                    <SummaryCard title="Unavailable" value={downMonitorCount} description="Currently offline" icon={<CircleX className="size-5" />} iconClassName="bg-red-500/15 text-red-400"/>
                    <SummaryCard title="Pending" value={pendingMonitorCount} description="Waiting for first check" icon={<Activity className="size-5" />} iconClassName="bg-amber-500/15 text-amber-400"/>
                </section>
                <section className="mt-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Your Monitors</h2>

                            <p className="mt-1 text-sm text-slate-400">Expand a monitor to view details, logs and response times.</p>
                        </div>
                        <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-400">{monitors.length} monitor</span> 
                    </div>

                    {loading ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                            Monitors loading...
                        </div>
                    ) : monitors.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-16 text-center">
                            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                                <Activity className="size-7" />
                            </div>

                            <h3 className="mt-5 text-lg font-semibold">
                                No monitors yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                                Create your first monitor and start tracking availability
                                and response time.
                            </p>

                            <div className="mt-6 flex justify-center">
                                <AddMonitorDialog
                                    mode="add"
                                    onSuccess={fetchMonitors}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {monitors.map((monitor) => (
                                <MonitorCard
                                    key={monitor.id_var}
                                    monitor={monitor}
                                    onMonitorEdited={fetchMonitors}
                                    onMonitorDeleted={fetchMonitors}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

type SummaryCardProps = {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
    iconClassName: string;
};

function SummaryCard({title,value,description,icon,iconClassName}: SummaryCardProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-700">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
                </div>

                <div className={`flex size-10 items-center justify-center rounded-xl ${iconClassName}`}>{icon}</div>   
            </div>
            <p className="mt-3 text-sm text-slate-500">{description}</p>   
        </div>
    );
}

export default Dashboard;