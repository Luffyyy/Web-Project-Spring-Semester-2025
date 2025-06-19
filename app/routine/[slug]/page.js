import { findExercises, getExerciseRoutine } from "@/app/actions";
import EditRoutine from "../edit-routine";

export default async function Page({ params }) {
    const { slug } = await params;
    const routine = await getExerciseRoutine(slug);
    const exercises = await findExercises();

    return <EditRoutine routine={routine} initialExercises={exercises}/>;
}