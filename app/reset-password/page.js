"use client"
import { useState } from "react";
import Input from "@/components/input";
import { sendPasswordReset } from "../actions";

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [done, setDone] = useState('');
    const [msg, setMsg] = useState('');

    async function doSendPasswordReset() {
        setDone(true);
        sendPasswordReset(email);
        setMsg('If a user with said email exists, an email should be sent with instructions on resetting your password.');
    }

    return <div className="lg:w-1/4 md:w-1/2 w-full mx-auto">
        <div id="loginForm" className="flex flex-col gap-3">
            <strong className="text-3xl">Reset Password</strong>
            <Input required={true} value={email} onChange={setEmail} label="Email" name="email" disabled={done}/>
            <button type="submit" className="btn" onClick={doSendPasswordReset} disabled={done}>Send</button>

            <div id="message" className="mt-2 text-center text-sm">
                {msg}
            </div>
        </div>
    </div>
}