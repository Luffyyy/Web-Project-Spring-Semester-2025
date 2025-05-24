import getMongoCollection from '@/lib/getMongoCollection';
import normalizeMongoIds from '@/lib/normalizeMongoIds';
import ExerciseList from './exercise-list';
import { createLoader, parseAsArrayOf, parseAsString } from 'nuqs/server';
import { findExercises } from '../actions';

export default async function Browse({ searchParams }) {  
    const collection = await getMongoCollection('exercises');
    const { query, difficulty, tags } = createLoader({
        query: parseAsString,
        difficulty: parseAsString,
        tags: parseAsArrayOf(parseAsString)
    })(await searchParams);

    let exercises = await collection.find().toArray();
    exercises = await findExercises(query, difficulty, tags);

    return <>
        <strong className="text-3xl">Browse Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises}/>
        </div>
    </>
}