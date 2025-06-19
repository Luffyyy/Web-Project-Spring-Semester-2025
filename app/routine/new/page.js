import { findExercises } from "@/app/actions"
import EditRoutine from "../edit-routine";
import { getUser } from "@/lib/server-utils";
import notLoggedIn from "@/app/not-logged-in";

export default async function NewRoutine() {
    const user = await getUser();
    
    if (!user) {
        return notLoggedIn();
    }

    const exercises = await findExercises();
    return <EditRoutine initialExercises={exercises}/>
}