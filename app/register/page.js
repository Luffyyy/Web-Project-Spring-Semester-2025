"use client"
import { useMainStore } from "@/stores";
// import { loadUsers } from './db.js';
// document.getElementById('registerForm').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const username = document.getElementById('userInput').value;
//     const email = document.getElementById('mailInput').value;
//     const password = document.getElementById('passInput').value;
//     const confirmPassword = document.getElementById('confirmInput').value;
//     const dob = document.getElementById('dateInput').value;
//     const messageDiv = document.getElementById('registerMessage');
//     let users = localStorage.getItem('users');
//     const newUser = { username, email, password, dob };
//     messageDiv.textContent = "";
//     if (password !== confirmPassword) {
//         messageDiv.textContent = "Passwords do not match.";
//         messageDiv.classList.remove("text-green-500");
//         messageDiv.classList.add("text-red-500");
//         return;
//     }

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { register } from "../actions";
import Input from "@/components/input";

//     try {
//         if(users === null){
//             users = await loadUsers();
//         }
//         else{
//             users = JSON.parse(users) || [];
//         }

//         if (users.some(user => user.username === username || user.email === email)) {
//             messageDiv.textContent = "Username or email already exists.";
//             messageDiv.classList.remove("text-green-500");
//             messageDiv.classList.add("text-red-500");
//             return;
//         }

//         users.push(newUser); // Add the new user to the users array
//         localStorage.setItem('users', JSON.stringify(users));
//         localStorage.setItem('loggedInUser', JSON.stringify(newUser));

//         messageDiv.textContent = "Registration successful! Redirecting to main page...";
//         messageDiv.classList.remove("text-red-500");
//         messageDiv.classList.add("text-green-500");
//         setTimeout(() => {
//             window.location.href = 'index.html'; //will be something else later
//         }, 2000);

//     } catch (error) {
//         console.error('Error:', error);
//         messageDiv.textContent = "An error occurred during registration.";
//         messageDiv.classList.remove("text-green-500");
//         messageDiv.classList.add("text-red-500");
//     }
// });

export default function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(undefined);
    const [err, setErr]  = useState('');
    const [passErr, setPassErr]  = useState('');

    const router = useRouter();
    const setUser = useMainStore(state => state.setUser);

    useEffect(() => {
        if (password && confirmPassword && password != confirmPassword) {
            setPassErr("Password don't match");
        } else {
            setPassErr();
        }
    }, [password, confirmPassword]);

    async function doRegister(e) {
        e.preventDefault();
        const { user, error } = await register(name, password, email, dob);
        if (user) {
            setUser(user);
            router.push(`/`);
        } else {
            setErr(error);
        }
    }

    return <div className="lg:w-1/4 md:w-1/2 w-full mx-auto">
        <form id="registerForm" action="/login" method="post" className="flex flex-col gap-3">
            <strong className="text-3xl">Register</strong>
            <Input required={true} value={name} onChange={setName} label="Username" name="username" />
            <Input required={true} value={email} onChange={setName} label="E-Mail" name="username"/>
            <Input required={true} value={password} onChange={setPassword} label="Password" name="password" type="password" validity={passErr}/>
            <Input required={true} value={confirmPassword} onChange={setConfirmPassword} label="Confirm Password" name="password" type="password"/>
            <Input required={true} value={dob} onChange={setDob} label="Birth Date" name="dob" type="date"/>
            <Link href="/login" className="block text-right">Already Got an Account?</Link>
            <button type="submit" className="btn" onClick={doRegister}>Register</button>
        </form>
        <div id="registerMessage" className="mt-2 text-red-500 text-center text-sm">
            {err}
        </div>
    </div>
}