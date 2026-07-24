import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;