"use client"

import { toggleFavorites } from "@/app/actions";
import { useContext, useMemo, useState } from "react";
import { UserContext } from "./layout/client-layout";

export default function AddToFavoritesButton({exerciseId}) {
    const { user } = useContext(UserContext);
    const [ favorites, setFavorites ] = useState(user?.favorites ?? [])
    const favorited = useMemo(() => favorites.includes(exerciseId), [exerciseId, favorites])

    async function toggle() {
        await toggleFavorites(exerciseId);
        
        const favs = [...favorites];
        if (favorited) {
            favs.splice(user.favorites.findIndex(id => id === exerciseId), 1);
        } else {
            favs.push(exerciseId);
        }
        setFavorites(favs)
    }

    if (!user) return null;
    return (
        <button className="btn" onClick={toggle}>
            {favorited ? 'Unfavorite' : 'Favorite'}
        </button>
    );
}