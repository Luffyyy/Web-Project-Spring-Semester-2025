import RoutinesClient from "./routines-client";
import { findExerciseRoutines } from "../actions";
import { daysOfTheWeek } from "@/lib/constants";
import { getUser } from "@/lib/server-utils";
import notLoggedIn from "../not-logged-in";

export default async function WorkoutRoutine() {
    const user = await getUser();
    
    if (!user) {
        return notLoggedIn();
    }

    const routines = await findExerciseRoutines(daysOfTheWeek[new Date().getDay()]);

    return <div>
        <RoutinesClient initialRoutines={routines}/>
    </div>
}