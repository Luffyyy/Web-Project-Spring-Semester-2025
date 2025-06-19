"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useCookies } from "next-client-cookies";
import { UserContext } from "./client-layout";

export default function Header({ theme: initialTheme }) {
    const [ query, setQuery ] = useState('');
    const [ menuVisible, setMenuVisible ] = useState(false);
    const [ dropdownOpen, setDropdownOpen ] = useState(false);
    const router = useRouter();
    const cookies = useCookies();

    const { user, setUser } = useContext(UserContext);
    const [ theme, setTheme ] = useState(initialTheme);

    // This is called when theme changes
    useEffect(() => {
        document.body.classList.toggle('dark', theme == 'dark');
        document.body.classList.toggle('light', theme == 'light');
        cookies.set('theme', theme);
    }, [theme, cookies]);

    function logout() {
        setUser();
        cookies.remove('user');
        router.push('/');
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
            <div className="flex flex-wrap gap-2 items-center justify-between">
                <Link href="/">
                    <img src="/assets/Logo.png" width="128" alt="Logo"/>
                </Link>
                <div className="justify-start hidden lg:flex gap-1" id="popUpMenu">
                    <Link href="/browse" className="nav-link">Exercises</Link>
                    {user && (<>
                        <Link href="/favorites" className="nav-link max-xl:hidden">Favorite Exercises</Link>
                        <Link href="/routine" className="nav-link">Routines</Link>
                    </>)}
                    {user?.isAdmin && (<Link href="/add-exercise" className="nav-link max-xl:hidden">Add Exercise</Link>)}
                </div>
                {/* DROPDOWN MENU */}
                {user && (
                    <div className="relative xl:hidden max-lg:hidden">
                        <button
                            className="nav-link flex items-center gap-1"
                            onClick={() => setDropdownOpen(open => !open)}
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                            type="button"
                        >
                            More
                            <svg width="16" height="16" fill="currentColor" className="inline ml-1">
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 content flex flex-col rounded shadow-lg z-50 min-w-[250px]">
                                <Link href="/favorites" className="nav-link" onClick={() => setDropdownOpen(false)}>
                                    Favorite Exercises
                                </Link>
                                {user?.isAdmin && (
                                    <Link href="/add-exercise" className="nav-link" onClick={() => setDropdownOpen(false)}>
                                        Add Exercise
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
                <div className="ml-auto max-lg:hidden flex gap-1">
                    <input type="search" className="input search" placeholder="Search" name="query" onInput={e => setQuery(e.target.value)}/>
                    <button className="btn btn-small hover:cursor-pointer" onClick={search}>
                        <img src="/assets/MdiMagnify.svg" width="24" alt="Search"/>
                    </button>
                </div>
                <div className="gap-2 flex items-center max-lg:ml-auto">
                {user?.isAdmin && (
                    <span className="px-2 py-1 text-sm font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-400 dark:text-black">
                    Admin
                    </span>
                )}
                {userElem}
                <button className="nav-link ml-auto max-lg:hidden" id="theme-btn" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                    {theme == 'dark' ? '🌙' : '☀️'}
                </button>
                </div>
                <button className="lg:hidden nav-link" id="btn-menu" onClick={() => setMenuVisible(!menuVisible)}>
                    <img src="assets/MdiMenu.svg" className="icon" alt="burger-menu"/>
                </button>
            </div>
            <div className="relative w-full flex flex-col items-end">
                <div id="mobile-menu" className={menuClasses}>
                    <Link href="/browse" className="nav-link">Browse Exercises</Link>
                    {user && (<>
                        <Link href="/favorites" className="nav-link">Favorite Exercises</Link>
                        <Link href="/routine" className="nav-link">Routines</Link>
                    </>)}
                    {user?.isAdmin && (<Link href="/add-exercise" className="nav-link">Add Exercise</Link>)}
                    {!user && <>
                        <Link href="/login" className="nav-link login-btn" id="login-mobile">Login</Link>
                        <Link href="/register" className="nav-link register-btn" id="register-mobile">Register</Link>
                    </>}
                    <button className="nav-link text-left" id="theme-btn" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                        {theme == 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
                    </button>
                </div>
            </div>
        </header>
    );
}