import ExerciseList from '@/components/exercise-list';
import getMongoCollection from '@/lib/getMongoCollection';
import normalizeMongoIds from '@/lib/normalizeMongoIds';

export default async function Browse() {
    const collection = await getMongoCollection('exercises');

    let exercises = await collection.find().toArray();
    exercises = normalizeMongoIds(exercises)

    return <>
        <strong className="text-3xl">Browse Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises}/>
        </div>
    </>
}