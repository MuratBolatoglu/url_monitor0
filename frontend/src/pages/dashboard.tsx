import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MonitorCard from "@/components/MonitorCard";
function Dashboard() {
    const navigate = useNavigate();

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
        <div className="mt-8"><MonitorCard /></div>
    </div>
    );
}

export default Dashboard;