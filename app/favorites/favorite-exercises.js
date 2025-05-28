"use client"

import { useMainStore } from "@/stores";
import ExerciseList from "../browse/exercise-list";

export default function FavoriteExercises({ exercises }) {
    const user = useMainStore(state => state.user);
    if (!user) {
        return ErrorPage({ status: 403, message: 'You must be logged in to view your favorites.' });
    }
    return <>
        <strong className="text-3xl">Browse Favorite Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises} isFavorites={true}/>
        </div>
    </>
}