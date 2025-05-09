"use client"
import { createContext, useEffect, useRef, useState } from "react";
import Header from "./header";
import { useCookies } from "next-client-cookies";
import { createMainStore } from "@/stores";

export const ThemeContext = createContext();
export const StoreContext = createContext();

export default function ClientLayout({ theme: initialTheme, user: initialUser, children }) {
    const [ theme, setTheme ] = useState(initialTheme);
    const store = useRef(createMainStore(initialUser)).current;
    const cookies = useCookies();

    // This is called when theme changes
    useEffect(() => {
        document.body.classList.toggle('dark', theme == 'dark');
        cookies.set('theme', theme);
    }, [theme, cookies]);

    return <ThemeContext.Provider value={theme}>
        <StoreContext value={store}>
            <Header/>

            <main className="grow flex flex-col items-center w-full">
                {children}
            </main>

            <footer className="p-4 content rounded z-10">
                <span>Made By Group 2 - Braude College</span>
                <button className="nav-link ml-auto" id="theme-btn" onClick={() => setTheme(theme == 'dark' ? '' : 'dark')}>
                    {theme == 'dark' ? '🌙' : '☀️'}
                </button>
            </footer>
        </StoreContext>
    </ThemeContext.Provider>
}