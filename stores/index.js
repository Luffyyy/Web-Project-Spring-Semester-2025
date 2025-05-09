import { StoreContext } from "@/components/layout/client-layout";
import { useContext } from "react";
import { create, useStore } from "zustand";

export function createMainStore(initialUser) {
    return create(set => ({
        user: initialUser,
        setUser: user => set(() => ({ user }))
    }))
}

export function useMainStore(selector) {
    const store = useContext(StoreContext);
    return useStore(store, selector);
}