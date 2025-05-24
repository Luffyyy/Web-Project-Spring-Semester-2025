"use client"
import { changePassword } from "@/app/actions";
import Input from "@/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ResetPasswordForm({ token, email }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [err, setErr]  = useState('');
    const [passErr, setPassErr]  = useState('');
    const router = useRouter();
    const disabledForm = useMemo(
        () => !password || !confirmPassword || err?.length > 0 || passErr?.length > 0, 
        [password, confirmPassword, err, passErr]
    );

    useEffect(() => {
        if (password && confirmPassword && password != confirmPassword) {
            setPassErr("Password don't match!");
        } else {
            setPassErr();
        }
    }, [password, confirmPassword]);

    async function doChangePassword(e) {
        e.preventDefault();
        if (await changePassword(token, email, password)) {
            router.push(`/login`);
        } else {
            setErr('Failed changing password! Please try again later.');
        }
    }

    return <div className="lg:w-1/4 md:w-1/2 w-full mx-auto">
        <form id="registerForm" action="/login" method="post" className="flex flex-col gap-3">
            <strong className="text-3xl">Reset Password</strong>
            <Input required={true} value={password} onChange={setPassword} label="Password" name="password" type="password" validity={passErr}/>
            <Input required={true} value={confirmPassword} onChange={setConfirmPassword} label="Confirm Password" name="password" type="password"/>
            <button type="submit" className="btn" onClick={doChangePassword} disabled={disabledForm}>Register</button>
        </form>
        <div id="registerMessage" className="mt-2 text-red-500 text-center text-sm">
            {err}
        </div>
    </div>
}