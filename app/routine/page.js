import RoutinesClient from "./routines-client";
import { findExerciseRoutines } from "../actions";
import { daysOfTheWeek } from "@/lib/constants";

export default async function WorkoutRoutine() {
    const routines = await findExerciseRoutines(daysOfTheWeek[new Date().getDay()]);

    return <div>
        <RoutinesClient initialRoutines={routines}/>
    </div>
}