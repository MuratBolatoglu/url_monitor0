import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MonitorCard from "@/components/MonitorCard";
import type { MonitorCardProps } from "@/types/Monitor";
import { useEffect, useState } from "react";
import api from "@/services/api";


function Dashboard() {
    const navigate = useNavigate();
    const [monitors,setMonitors] = useState<MonitorCardProps[]>([])
    useEffect(()=> {
        async function fetchMonitors(){
            try {
                const response = await api.get("/monitors")
                setMonitors(response.data);
            } catch (error) {
                console.log(error)
            }

        }
        fetchMonitors();
    },[]);



    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
    <div className="min-h-screen p-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
        <div className="mt-8">
            {monitors.map((monitor) =>
                <MonitorCard name={monitor.name} url={monitor.url} status={monitor.status} key={monitor.url}/>
            )}
        </div>
    </div>
    );
}

export default Dashboard;