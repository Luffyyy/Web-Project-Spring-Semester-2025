"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMainStore } from "@/stores";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import classNames from "classnames";

export default function Header() {
    const [ query, setQuery ] = useState('');
    const [ menuVisible, setMenuVisible ] = useState(false);
    const router = useRouter();
    const cookies = useCookies();

    const { user, setUser } = useMainStore(state => state);
    useEffect(() => {
        const u = cookies.get('user');
        if (u === 'admin') {
            setUser({ username: 'admin', isAdmin: true });
        }
        }, []);
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
            <Link href="/profile" aria-label="Profile"><img id="avatar" src="/assets/default-avatar.png" width={40} height={40} alt="Avatar" className="rounded-full cursor-pointer transition hover:opacity-80 hover:scale-105" /></Link>
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
                    {user?.isAdmin && (
                        <Link href="/addvideos" className="nav-link bg-green-600 text-white px-3 py-1 rounded">
                            Add New Videos
                        </Link>
                    )}
                </div>
                <div className="ml-auto max-lg:hidden flex gap-1">
                    <input type="search" className="input" placeholder="Search" name="query" onInput={e => setQuery(e.target.value)}/>
                    <button className="btn btn-small hover:cursor-pointer" onClick={search}>
                        <img src="/assets/MdiMagnify.svg" width="24" alt="Search"/>
                    </button>
                </div>
                <div className="gap-2 flex items-center max-lg:ml-auto">
                {user?.isAdmin && (
                    <span className="px-2 py-1 text-sm font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-400 dark:text-black">
                    Admin Mode
                    </span>
                )}
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
                    {user?.isAdmin && (
                    <Link href="/addvideos" className="nav-link bg-green-600 text-white px-3 py-1 rounded">Add New Videos</Link>
                    )}
                    <Link href="/login" className="nav-link login-btn" id="login-mobile">Login</Link>
                    <Link href="/register" className="nav-link register-btn" id="register-mobile">Register</Link>
                </div>
            </div>
        </header>
    );
}