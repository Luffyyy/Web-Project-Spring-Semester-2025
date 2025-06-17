"use client"
import { createContext, useEffect, useRef, useState } from "react";
import Header from "./header";
import { useCookies } from "next-client-cookies";

export const ThemeContext = createContext();
export const UserContext = createContext();

export default function ClientLayout({ theme: initialTheme, user: initialUser, children }) {
    const [ theme, setTheme ] = useState(initialTheme);
    const [ user, setUser ] = useState(initialUser);
    const cookies = useCookies();

    // This is called when theme changes
    useEffect(() => {
        document.body.classList.toggle('dark', theme == 'dark');
        document.body.classList.toggle('light', theme == 'light');
        cookies.set('theme', theme);
    }, [theme, cookies]);

    return <ThemeContext.Provider value={theme}>
        <UserContext value={{user, setUser}}>
            <Header/>

            <main className="grow flex flex-col items-center w-full">
                {children}
            </main>

            <footer className="p-4 content rounded z-10">
                <span>Made By Group 2 - Braude College</span>
                <button className="nav-link ml-auto" id="theme-btn" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                    {theme == 'dark' ? '🌙' : '☀️'}
                </button>
            </footer>
        </UserContext>
    </ThemeContext.Provider>
}