import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Sign in to your account </CardDescription>

                </CardHeader>

                <CardContent>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>  
                </CardContent>

                
            </Card>
        </div>
        
        
    );
}

export default Login;