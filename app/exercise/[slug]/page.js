import { notFound } from 'next/navigation';
import ExerciseClient from './exercise-client';
import { getMongoCollection } from '@/lib/server-utils';

export default async function Page({ params }) {
    const { slug } = await params;
    const exercises = await getMongoCollection('exercises');
    const exercise = await exercises.findOne({ name: slug });

    if (!exercise) {
        return notFound();
    }

    exercise._id = exercise._id.toString();

    return <ExerciseClient exercise={exercise}/>;
}