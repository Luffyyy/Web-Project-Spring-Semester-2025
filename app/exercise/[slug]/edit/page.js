import { getExerciseById } from "@/app/actions";
import EditExercise from "../../edit-exercise";

export default async function AddOrEditExercisePage({ params }) {
    const exercise = await getExerciseById(params.slug);
    return <EditExercise
        initial={exercise}
        titleLabel="Edit Exercise"
        submitLabel="Save"
        modalTitle="Exercise Updated!"
        modalDesc="Your changes were saved successfully."
    />;
}