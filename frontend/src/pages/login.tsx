import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import {Activity,Loader2,LockKeyhole,Mail,} from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    async function handleSubmit() {
        if (!email.trim() || !password.trim()) {
            setErrorMessage("Email and password are required.");
            return;
        }
        try {
            setLoading(true);
            setErrorMessage("");
            if (isLogin) {
                const response = await api.post("/auth/login", {
                    email,
                    password,
                });

                localStorage.setItem("token", response.data);
                navigate("/dashboard");
            } else {
                await api.post("/users", {
                    email,
                    password,
                });

                setIsLogin(true);
                setPassword("");
            }
        } catch (error) {
            console.error(error);

            setErrorMessage(
                isLogin
                    ? "Email or password is incorrect."
                    : "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    function changeMode(loginMode: boolean) {
        setIsLogin(loginMode);
        setErrorMessage("");
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
            <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

                    <div className="relative w-full max-w-md">
                        <div className="mb-8 text-center">
                            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-lg shadow-indigo-950/40">
                                <Activity className="size-7" />
                            </div>
                            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">  URL Monitor  </h1>
                            <p className="mt-2 text-sm text-slate-400"> Monitor your websites in real time </p>
                        </div>
                        <Card className="border-slate-800 bg-slate-900/90 text-slate-100 shadow-2xl shadow-black/30 backdrop-blur">
                            <CardHeader className="space-y-5">
                                <div>
                                    <CardTitle className="text-2xl text-white">  {isLogin ? "Welcome back" : "Create an account"}  </CardTitle>
                                    <CardDescription className="mt-2 text-slate-400"> {isLogin ? "Sign in to access your monitoring dashboard." : "Register to start monitoring your services."} </CardDescription>
                                </div>
                        <div className="grid grid-cols-2 rounded-xl border border-slate-800 bg-slate-950 p-1">
                            <Button type="button" variant="ghost" onClick={() => changeMode(true)}
                                className={isLogin ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}>Login</Button>
                            <Button type="button" variant="ghost" onClick={() => changeMode(false)}
                                className={!isLogin ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}>Register</Button>
                        </div>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-5" onSubmit={(event) => {event.preventDefault(); handleSubmit();}}>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                                            <Input id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" disabled={loading}
                                                className="h-11 border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
                                        <div className="relative">
                                            <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                                            <Input id="password" value={password} onChange={(event) =>setPassword(event.target.value)} placeholder="Enter your password" type="password" autoComplete={isLogin ? "current-password": "new-password"} disabled={loading}
                                                className="h-11 border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"/>
                                        </div>
                                    </div>
                                    {errorMessage && (
                                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">{errorMessage}</div>
                                    )}

                                    <Button type="submit" disabled={loading} className="h-11 w-full bg-indigo-600 font-semibold text-white hover:bg-indigo-500">
                                        {loading && (<Loader2 className="mr-2 size-4 animate-spin" />)}
                                        {loading ? isLogin ? "Signing in..." : "Creating account..." : isLogin ? "Login": "Register"}
                                    </Button>
                                </form>
                            </CardContent>
                            <CardFooter className="justify-center border-t border-slate-800 pt-5">
                                <p className="text-xs text-slate-500">Secure authentication powered by JWT</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
    );
}
export default Login;