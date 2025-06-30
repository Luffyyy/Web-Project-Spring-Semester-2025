import { addVideo } from "@/app/actions";
import ExerciseFormPage from "../add-edit";

export default function AddExercisePage() {
    return (
        <ExerciseFormPage
            onSubmit={addVideo}
            submitLabel="Add Exercise"
            modalTitle="Video Added!"
            modalDesc="Your video was added successfully."
        />
    );
}