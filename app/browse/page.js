import ExerciseList from '@/components/exercise-list';
import exercises from '@/data/exercises.json'; // TODO: this should be fetched from DB

export default async function Browse() {
    return <>
        <strong className="text-3xl">Browse Exercises</strong>
        <div className="flex grow gap-4 lg:flex-row flex-col w-full">
            <ExerciseList initialExercises={exercises}/>
        </div>
    </>
}