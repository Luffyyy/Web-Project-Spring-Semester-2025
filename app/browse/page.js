import getMongoCollection from '@/lib/getMongoCollection';
import ExerciseList from './exercise-list';
import { createLoader, parseAsArrayOf, parseAsString } from 'nuqs/server';
import { findExercises } from '../actions';

export default async function Browse({ searchParams }) {  
    const collection = await getMongoCollection('exercises');

    // This uses the nuqs, which makes it easier to handle query strings (?param=something&param2=something else)
    const { query, difficulty, tags } = await createLoader({
        query: parseAsString,
        difficulty: parseAsString,
        tags: parseAsArrayOf(parseAsString)
    })(searchParams);

    const exercises = await findExercises(query, difficulty, tags);

    return <>
        <strong className="text-3xl">Browse Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises}/>
        </div>
    </>
}