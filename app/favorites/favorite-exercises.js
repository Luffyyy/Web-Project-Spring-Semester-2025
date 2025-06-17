"use client"

import { useContext } from "react";
import ExerciseList from "../browse/exercise-list";
import { UserContext } from "@/components/layout/client-layout";

export default function FavoriteExercises({ exercises }) {
    const { user } = useContext(UserContext);
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