"use client"

import { addToFavorites } from "@/app/actions";
import { useMainStore } from "@/stores";

export default function AddToFavoritesButton({exerciseId}) {
    const user = useMainStore(state => state.user);

    if (!user) return null;
    return (
        <button className="btn" onClick={() => addToFavorites(exerciseId)}>
            Add to Favorites
        </button>
    );
}