"use client"

import { daysOfTheWeek } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { deleteExerciseRoutine, findExerciseRoutines } from "../actions";
import Modal from "@/components/modal";

export default function RoutinesClient({ initialRoutines }) {
    const [ chosenDay, setChosenDay ] = useState(daysOfTheWeek[new Date().getDay()]);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ currDeleteRoutine, setCurrDeleteRoutine ] = useState(null);

    const dayOptions = [...daysOfTheWeek, 'all'].map(day => 
        <button
            key={day}
            className={classNames('btn', {primary: chosenDay == day})}
            onClick={() => setChosenDay(day)}>{capitalize(day)}
        </button>
    );
    
    const [ routines, setRoutines ] = useState(initialRoutines);
    const first = useRef(false);

    useEffect(() => {
        if (!first) {
            setFirst(true);
        } else {
            findExerciseRoutines(chosenDay).then(routines => setRoutines(routines))
        }
    }, [chosenDay])

    async function deleteRoutine() {
        await deleteExerciseRoutine(currDeleteRoutine);
        setDeleteModal(false);

        setRoutines(routines.filter(routine => routine._id !== currDeleteRoutine));
    }

    function askDeleteRoutine(id) {
        setCurrDeleteRoutine(id);
        setDeleteModal(true);
    }

    const routineElements = routines.map(routine =>
        <div className="content flex flex-col gap-2" key={routine._id}>
            <div className="flex gap-2 items-center">
                <b className="text-xl">{routine.title}</b>
                <Link className="btn ml-auto" href={`/routine/${routine._id}`}>Edit</Link>
                <button className="btn" onClick={() => askDeleteRoutine(routine._id)}>Delete</button>
            </div>
            {routine.exercises.length ? <ul>
                {routine.exercises.map(exercise => {
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
            </ul> : <span className="p-2">No exercises to do</span>}
        </div>
    );

    return <div className="flex gap-6 flex-col">
        <div className="flex">
            <strong className="text-3xl self-center">Exercise Routines</strong>
            <Link className="ml-auto items-center btn" href="/routine/new">Add</Link>
        </div>
        <div className="flex gap-2 flex-wrap">
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
            desc="Are you sure you want to delete this routine? This action cannot be undone."
            setState={setDeleteModal}
            buttons={[
                { text: 'Yes', click: deleteRoutine },
                { text: 'No', click: () => setDeleteModal(false) }
            ]}
        />}
    </div>
}