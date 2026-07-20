import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddMonitorDialog from "@/components/AddMonitorDialog";
import MonitorCard from "@/components/MonitorCard";
import api from "@/services/api";
import type { Monitor } from "@/types/Monitor";

function Dashboard() {
    const navigate = useNavigate();
    const [monitors, setMonitors] = useState<Monitor[]>([]);

    async function fetchMonitors() {
        try {
            const response = await api.get("/monitors");
            setMonitors(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMonitors();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="min-h-screen p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-2">
                    <AddMonitorDialog onMonitorCreated={fetchMonitors} />
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
            <div className="mt-8">
                {monitors.map((monitor) => <MonitorCard onMonitorEdited={fetchMonitors} onMonitorDeleted={fetchMonitors} key={monitor.id_var} monitor={monitor} />)}
            </div>
        </div>
    );
}

export default Dashboard;