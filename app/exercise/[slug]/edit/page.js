import { getExerciseById } from "@/app/actions";
import ExerciseFormPage from "../../add-edit";

export default async function AddOrEditExercisePage({ params }) {
    const exercise = await getExerciseById(params.slug);
    return (
        <ExerciseFormPage
            initial={exercise}
            submitLabel="Save"
            modalTitle="Exercise Updated!"
            modalDesc="Your changes were saved successfully."
        />
    );
}