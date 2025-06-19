"use client"
import { createContext, useEffect, useRef, useState } from "react";
import Header from "./header";
import { useCookies } from "next-client-cookies";

export const ThemeContext = createContext();
export const UserContext = createContext();

export default function ClientLayout({ theme, user: initialUser, children }) {
    const [ user, setUser ] = useState(initialUser);

    return <ThemeContext.Provider value={theme}>
        <UserContext value={{user, setUser}}>
            <Header theme={theme}/>

            <main className="grow flex flex-col items-center w-full">
                {children}
            </main>

            <footer className="p-4 content rounded z-10">
                <span>Made By Group 2 - Braude College</span>
            </footer>
        </UserContext>
    </ThemeContext.Provider>
}