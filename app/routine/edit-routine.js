"use client"
import Input from "@/components/input";
import ListExercise from "@/components/list-exercise";
import Modal from "@/components/modal";
import { daysOfTheWeek } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import { useMemo, useState } from "react";
import { addExerciseRoutine, saveExerciseRoutine } from "../actions";
import { useRouter } from "next/navigation";
import classNames from "classnames";

export default function EditRoutine({ routine, initialExercises }) {
    const [showExercises, setShowExercises] = useState(false);
    const [title, setTitle] = useState(routine?.title ?? '');
    // days: { [day]: [ {exerciseId, sets, reps}, ... ] }
    const [days, setDays] = useState(() => {
        // If editing, use routine.days, else initialize all days as empty arrays
        if (routine?.days) return { ...routine.days };
        return Object.fromEntries(daysOfTheWeek.map(day => [day, []]));
    });

    const [msg, setMsg] = useState('');
    const [chosenDay, setChosenDay] = useState(daysOfTheWeek[new Date().getDay()]);
    const router = useRouter();

    const canSave = useMemo(() => title.length && Object.values(days).flat(1).length > 0, [title, days])
    
    // Exercises for the currently selected day
    const exercises = days[chosenDay] || [];

    const dayOptions = daysOfTheWeek.map(day =>
        <button
            key={day}
            className={classNames('btn', { primary: chosenDay == day })}
            type="button"
            onClick={() => setChosenDay(day)}>{capitalize(day)}
        </button>
    );

    function chooseExercise(exercise) {
        const newExercises = [...exercises];
        newExercises.push({
            exerciseId: exercise._id,
            sets: 1,
            reps: 1,
        });
        setDays({ ...days, [chosenDay]: newExercises });
        setShowExercises(false);
    }

    function removeExerciseStep(step) {
        const newExercises = [...exercises];
        newExercises.splice(newExercises.indexOf(step), 1);
        setDays({ ...days, [chosenDay]: newExercises });
    }

    function insertExerciseStepAt(step, i) {
        const newExercises = [...exercises];
        newExercises.splice(newExercises.indexOf(step), 1);
        newExercises.splice(i, 0, step);
        setDays({ ...days, [chosenDay]: newExercises });
    }

    function saveExercise(e) {
        e.preventDefault();

        try {
            if (routine) {
                saveExerciseRoutine(routine._id, title, days);
                setMsg('Successfully saved exercise routine!');
            } else {
                addExerciseRoutine(title, days);
                setMsg('Successfully created exercise routine!');
                router.push('/routine');
            }
        } catch (error) {
            setMsg("Couldn't save the exercise :/");
        }
    }

    function updateVal(i, key, val) {
        const newExercises = [...exercises];
        newExercises[i] = { ...newExercises[i], [key]: val };
        setDays({ ...days, [chosenDay]: newExercises });
    }

    const exerciseList = initialExercises.map((ex, i) =>
        <ListExercise key={i} exercise={ex}>
            <button className="btn ml-auto my-auto" onClick={() => chooseExercise(ex)}>
                Select
            </button>
        </ListExercise>
    );

    const renderChosen = exercises.map(function (step, i) {
        const ex = initialExercises.find(ex => ex._id == step.exerciseId);
        const sets = <Input
            min="1"
            type="number"
            label="Sets"
            value={step.sets}
            onChange={val => updateVal(i, 'sets', val)}
            placeholder="Sets"
            required
        />

        const reps = <Input
            min="0"
            type="number"
            label="Reps"
            value={step.reps}
            onChange={val => updateVal(i, 'reps', val)}
            placeholder="Reps"
            required
        />

        const content = <div className="flex gap-3">
            {sets}
            {reps}
        </div>

        const arrows = <div className="flex flex-col self-center gap-2">
            {i != 0 && <button className="btn" onClick={() => insertExerciseStepAt(step, i - 1)}>↑</button>}
            {i != exercises.length - 1 && <button className="btn" onClick={() => insertExerciseStepAt(step, i + 1)}>↓</button>}
        </div>

        return <ListExercise key={i} exercise={ex} preContent={arrows} content={content}>
            <img className="ml-auto mb-4 hover:cursor-pointer icon"
                src="/assets/MdiClose.svg"
                width="24"
                alt="Close"
                onClick={() => removeExerciseStep(step)}
            />
        </ListExercise>
    });

    return <form className="w-250 mx-auto p-6 content" onSubmit={saveExercise}>
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center">{routine ? 'Edit Exercise Routine' : 'Add Exercise Routine'}</h1>

            <Input
                name="title"
                type="text"
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="Title"
                required
            />

            <div className="flex gap-2 flex-wrap self-center">
                {dayOptions}
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center">
                    <label>Exercises for {capitalize(chosenDay)}</label>
                    <button type="button" className="btn ml-auto" onClick={() => setShowExercises(true)}>Add</button>
                </div>
                <div className="flex flex-col max-h-120 overflow-auto gap-3 p-1">
                    {renderChosen.length ? renderChosen : 'No Exercises Added'}
                </div>
            </div>

            {showExercises &&
                <Modal setState={setShowExercises}>
                    <div className="max-h-128 w-150 overflow-auto gap-3 flex flex-col">
                        {exerciseList}
                    </div>
                </Modal>
            }

            <button className="btn" disabled={!canSave}>Save</button>

            {msg && <p className="text-center text-sm text-green-400">{msg}</p>}
        </div>
    </form>

}