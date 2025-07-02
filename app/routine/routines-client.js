"use client"

import { daysOfTheWeek } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import classNames from "classnames";
import Link from "next/link";
import { useMemo, useState } from "react";
import { deleteExerciseRoutine, findExerciseRoutines } from "../actions";
import Modal from "@/components/modal";

export default function RoutinesClient({ initialRoutines }) {
    const [ chosenDay, setChosenDay ] = useState(daysOfTheWeek[new Date().getDay()]);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ currDeleteRoutine, setCurrDeleteRoutine ] = useState(null);

    const dayOptions = daysOfTheWeek.map(day => 
        <button
            key={day}
            className={classNames('btn', {primary: chosenDay == day})}
            onClick={() => setChosenDay(day)}>{capitalize(day)}
        </button>
    );
    
    const [ routines, setRoutines ] = useState(initialRoutines);
    const routinesForDay = useMemo(() => routines.filter(routine => routine.days[chosenDay]?.length), [routines, chosenDay]);

    async function refreshRoutines() {
        setRoutines(await findExerciseRoutines());
    }

    async function deleteRoutine() {
        await deleteExerciseRoutine(currDeleteRoutine);
        setDeleteModal(false);

        setRoutines(routines.filter(routine => routine._id !== currDeleteRoutine));
    }

    function askDeleteRoutine(id) {
        setCurrDeleteRoutine(id);
        setDeleteModal(true);
    }

    const routineElements = routinesForDay.map(routine => {
        const exercises = routine.days[chosenDay];
        
        if (exercises?.length) {
            return <div className="content flex flex-col gap-2" key={routine._id}>
                <div className="flex gap-1 items-center max-sm:flex-col flex-wrap">
                    <b className="text-xl">{routine.title}</b>
                    <div className="flex gap-1 sm:ml-auto">
                        <Link className="btn" href={`/routine/${routine._id}`}>Edit</Link>
                        <button className="btn" onClick={() => askDeleteRoutine(routine._id)}>Delete</button>
                    </div>
                </div>
                <ul>
                    {exercises.map(exercise => {
                        let sets = exercise.sets;
                        let setsPar = `${exercise.sets} ${exercise.sets == 1 ? 'set' : 'sets'}`;
                        if (exercise.reps > 0) {
                            sets += "x"+exercise.reps;
                            setsPar += ` of ${exercise.reps} ${exercise.reps == 1 ? 'rep' : 'reps'}`;
                        }
                        return <li key={exercise.exerciseId}>
                            <Link href={`/exercise/${exercise.exerciseData.name}`}>
                                {exercise.exerciseData.title}
                            </Link>: {sets} ({setsPar})
                        </li>;
                    })}
                </ul>
            </div>
        }
    });

    return <div className="flex gap-6 flex-col">
        <div className="flex gap-1 max-sm:flex-col items-center">
            <strong className="text-3xl self-center">Exercise Routines</strong>
            <div className="flex gap-1 sm:ml-auto">
                <Link className="btn" href="/routine/new">Add</Link>
                <button className="btn" onClick={refreshRoutines}>Refresh</button>
            </div>
        </div>
        <div className="flex gap-1 flex-wrap justify-center">
            {dayOptions}
        </div>
        <div className="flex flex-col gap-3">
            {
                routineElements.length 
                ? routineElements 
                : <span className="text-center p-4">
                    No routines found
                </span>
            }
        </div>


        {deleteModal && <Modal 
            title="Delete Routine"
            desc={<>
                Are you sure you want to delete this routine? This action cannot be undone.
                <br/>
                This is applied on all days. If you wish to edit a specific day, go to Edit.
            </>}
            setState={setDeleteModal}
            buttons={[
                { text: 'Yes', click: deleteRoutine },
                { text: 'No', click: () => setDeleteModal(false) }
            ]}
        />}
    </div>
}