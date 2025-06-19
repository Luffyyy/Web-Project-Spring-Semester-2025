import { findExercises } from "@/app/actions"
import EditRoutine from "../edit-routine";

export default async function NewRoutine() {
    const exercises = await findExercises();
    return <EditRoutine initialExercises={exercises}/>
}