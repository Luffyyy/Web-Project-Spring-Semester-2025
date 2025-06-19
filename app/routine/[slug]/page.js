import { findExercises, getExerciseRoutine } from "@/app/actions";
import EditRoutine from "../edit-routine";
import { getUser } from "@/lib/server-utils";
import notLoggedIn from "@/app/not-logged-in";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { slug } = await params;
    const user = await getUser();
    
    if (!user) {
        return notLoggedIn();
    }
    
    const routine = await getExerciseRoutine(slug);

    if (!routine) {
        return notFound();
    }

    const exercises = await findExercises();

    return <EditRoutine routine={routine} initialExercises={exercises}/>;
}