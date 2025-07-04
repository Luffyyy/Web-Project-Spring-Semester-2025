"use client"
import Link from "next/link";
import { login } from "../actions";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { UserContext } from "@/components/layout/client-layout";

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg]  = useState('');
    const router = useRouter();

    const { setUser } = useContext(UserContext);

    async function doLogin(e) {
        e.preventDefault();

        const user = await login(name, password);
        if (user) {
            setUser(user);
            router.push(`/`);
        } else {
            setMsg('Wrong username and password combination!');
        }
    }

    return <div className="lg:w-1/4 md:w-1/2 w-full mx-auto">
        <form id="loginForm" action="/login" method="post" className="flex flex-col gap-3">
            <strong className="text-3xl">Login</strong>
            <Input required={true} value={name} onChange={setName} label="Username" name="username" />
            <Input required={true} value={password} onChange={setPassword} label="Password" name="password" type="password"/>
            <Link href="/reset-password" className="block text-right">Forgot Password?</Link>
            <button type="submit" className="btn" onClick={doLogin}>Login</button>
            <Link href="/register" className="btn">Register</Link>
        </form>
        
        <div id="loginMessage" className="mt-2 text-center text-sm">
            {msg}
        </div>
    </div>
}