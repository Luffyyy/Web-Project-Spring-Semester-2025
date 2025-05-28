"use client"

import { useMainStore } from "@/stores";
import ExerciseList from "../browse/exercise-list";

export default function FavoriteExercises({ exercises }) {
    const user = useMainStore(state => state.user);
    if (!user) {
        return <div className="content">
            <strong className="text-3xl">You must be logged in to view your favorites.</strong>
        </div>;
    }
    return <>
        <strong className="text-3xl">Browse Favorite Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises} isFavorites={true}/>
        </div>
    </>
}