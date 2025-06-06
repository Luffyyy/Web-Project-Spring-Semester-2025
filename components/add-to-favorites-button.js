"use client"

import { toggleFavorites } from "@/app/actions";
import { useMainStore } from "@/stores";
import { useMemo, useState } from "react";

export default function AddToFavoritesButton({exerciseId}) {
    const user = useMainStore(state => state.user);
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
            {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}