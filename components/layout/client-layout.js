"use client"
import { createContext, useState } from "react";
import Header from "./header";

export const ThemeContext = createContext();
export const UserContext = createContext();

export default function ClientLayout({ theme, user: initialUser, children }) {
    const [ user, setUser ] = useState(initialUser);

    return <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={{user, setUser}}>
            <Header theme={theme}/>

            <main className="grow flex flex-col items-center w-full">
                {children}
            </main>

            <footer className="p-4 content rounded z-10">
                <span>Made By Group 2 - Braude College</span>
            </footer>
        </UserContext.Provider>
    </ThemeContext.Provider>
}