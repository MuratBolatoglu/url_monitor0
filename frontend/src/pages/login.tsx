import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    async function handleSubmit() {
        if(isLogin){
            try {
                const response =await api.post("auth/login", { password,email });
                console.log("Login successful");
                console.log(response.data);
                localStorage.setItem("token", response.data);
                navigate("/dashboard");
            }catch (error) {
                console.error(error);
            }
        }else {
            try {
                const response =await api.post("users",{password,email});
                console.log("Register successful");
                console.log(response.data);
                setIsLogin(true);
            }catch (error) {
                console.error(error);
            }
        }

        
    }

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="flex flex-col items-center">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">URL Monitor</h1>
                    <p className="text-muted-foreground mt-2">Monitor your websites in real time</p>
                </div>
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader>
                        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
                        <CardDescription>{isLogin ? "Sign in to your account" : "Create a new account"}</CardDescription>
                        <CardAction>
                            <ButtonGroup>
                                <Button onClick={() => setIsLogin(true)} variant="ghost" className={`hover:bg-gray-500 ${isLogin ? "bg-black text-white  " : ""}`} >Login</Button>
                                <Button onClick={() => setIsLogin(false)} variant="ghost" className={`hover:bg-gray-500 ${!isLogin ? "bg-black text-white  " : ""}`} >Register</Button>
                            </ButtonGroup>
                        </CardAction>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>  
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full bg-gray-700 text-amber-50" type="button" onClick={()=>handleSubmit()}>{isLogin ? "Login" : "Register"}</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
        
        
    );
}

export default Login;

