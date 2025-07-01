import { addExercise } from "@/app/actions";
import EditExercise from "../edit-exercise";

export default function AddExercisePage() {
    return <EditExercise onSubmit={addExercise}/>;
}