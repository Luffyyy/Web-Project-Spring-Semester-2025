"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMainStore } from "@/stores";
import { useCookies } from "next-client-cookies";
import classNames from "classnames";

export default function Header() {
    const [ query, setQuery ] = useState('');
    const [ menuVisible, setMenuVisible ] = useState(false);
    const router = useRouter();
    const cookies = useCookies();

    const { user, setUser } = useMainStore(state => state);
    function logout() {
        setUser();
        cookies.remove('user');
    }

    function search(e) {
        e.preventDefault();
        router.push(`browse?query=${query}`);
    }

    let userElem = '';

    if (user) {
        userElem = <>
            <img id="avatar" src="/assets/default-avatar.png" width="40" height="40" alt="Avatar"/>
            <button id="logoutButton" className="nav-link" onClick={logout}>Logout</button>
        </>
    } else {
        userElem = <>
            <Link href="/login" className="nav-link login-btn max-lg:hidden!">Login</Link>
            <Link href="/register" className="nav-link register-btn max-lg:hidden!">Register</Link>
        </>
    }

    const menuClasses = classNames('flex flex-col gap-3 px-4 py-3 content rounded shadow-md w-full lg:hidden!', {
        hidden: !menuVisible
    });
    
    return (
        <header className="navbar p-4 backdrop-blur-md">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <Link href="/">
                    <img src="/assets/Logo.png" width="128" alt="Logo"/>
                </Link>
                <div className="justify-start hidden lg:flex gap-3" id="popUpMenu">
                    <Link href="/browse" className="nav-link">Browse Exercises</Link>
                    {user && (
                        <Link href="/favorites" className="nav-link">Favorite Exercises</Link>
                    )}
                </div>
                <div className="ml-auto max-lg:hidden flex gap-1">
                    <input type="search" className="input" placeholder="Search" name="query" onInput={e => setQuery(e.target.value)}/>
                    <button className="btn btn-small hover:cursor-pointer" onClick={search}>
                        <img src="/assets/MdiMagnify.svg" width="24" alt="Search"/>
                    </button>
                </div>
                <div className="gap-1 flex max-lg:ml-auto">
                    {userElem}
                </div>
                <button className="lg:hidden nav-link" id="btn-menu" onClick={() => setMenuVisible(!menuVisible)}>
                    <img src="assets/MdiMenu.svg" className="dark:invert" alt="burger-menu"/>
                </button>
            </div>
            <div className="relative w-full flex flex-col items-end">
                <div id="mobile-menu" className={menuClasses}>
                    <Link href="/browse" className="nav-link">Browse Exercises</Link>
                    {user && (
                        <Link href="/favorites" className="nav-link">Favorite Exercises</Link>
                    )}
                    <Link href="/login" className="nav-link login-btn" id="login-mobile">Login</Link>
                    <Link href="/register" className="nav-link register-btn" id="register-mobile">Register</Link>
                </div>
            </div>
        </header>
    );
}