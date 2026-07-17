import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const response =await api.post("auth/login", { password,email });
            console.log("Login successful");
            console.log(response.data);
            localStorage.setItem("token", response.data);
            navigate("/dashboard");
        }catch (error) {
            console.error(error);
        }
        
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Sign in to your account </CardDescription>

                </CardHeader>

                <CardContent>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>  
                </CardContent>

                <CardFooter>
                    <Button type="button" onClick={()=>handleLogin()}>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
        
        
    );
}

export default Login;

