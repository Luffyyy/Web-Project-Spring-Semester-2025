import getMongoCollection from '@/lib/getMongoCollection';
import ExerciseList from './exercise-list';
import { createLoader, parseAsArrayOf, parseAsString } from 'nuqs/server';
import { findExercises } from '../actions';
import { currentUser } from '../actions';

export default async function Browse({ searchParams }) {  
    const { query, difficulty, tags } = await createLoader({
        query: parseAsString,
        difficulty: parseAsString,
        tags: parseAsArrayOf(parseAsString)
    })(searchParams);

    const user = await currentUser(); // get the logged-in user
    const avoidMuscles = user?.avoidMuscles ?? [];

    const exercises = await findExercises(query, difficulty, tags);

    return <>
        <strong className="text-3xl">Browse Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises} avoidMuscles={avoidMuscles}/>
        </div>
    </>
}