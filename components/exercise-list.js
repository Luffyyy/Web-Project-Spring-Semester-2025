"use client"

import { capitalize } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExerciseList({ initialExercises }) {
    const [ query, setQuery ] = useState('');
    const [ diff, setDiff ] = useState('any');
    const [ highlight, setHighlight ] = useState(null);
    const [ exercises, setExercises ] = useState(initialExercises)

    const exerciseElements = exercises
        .filter(
            exercise => (!query || exercise.title.toLowerCase().match(query.toLowerCase())) 
                && (diff == 'any' || exercise.difficulty === diff)
        )
        .map(
            (exercise, i) => 
                (<Link href={`exercise/${encodeURIComponent(exercise.name)}`} className="content exercise" key={i}>
                    <img src={exercise.thumbnail} width="150" alt="Exercise Thumbnail"/>
                    <div className="flex flex-col">
                        <strong className="text-2xl">{exercise.title}</strong>
                        <span>{capitalize(exercise.difficulty)}</span>
                    </div>
                </Link>)
        );

    return <>
        <div className="content grow lg:self-start flex flex-col gap-4">
            <strong className="text-3xl mx-auto">Filters</strong>
            <div className="flex gap-2 flex-wrap">
                <div className="flex flex-col gap-1 grow">
                    <label htmlFor="exercises-query">Search</label>
                    <input className="input" id="exercises-query" onInput={e => setQuery(e.target.value)} value={query}/>
                </div>
                <div className="flex flex-col gap-1 grow">
                    <label htmlFor="exercises-diff">Difficulty</label>
                    <select className="input" id="exercises-diff" value={diff} onChange={e => setDiff(e.target.value)}>
                        <option value="any">Any</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>
            <div className="body flex mx-auto" style={{minHeight: '450px'}}>
                <img
                    src="/assets/body.png"
                    useMap="#body-map"
                    onMouseOver={() => setHighlight()}
                    onClick={() => alert('Muscle group mannequin functionality to be implemented.')}
                    alt="Body"
                />
                <map name="body-map">
                    <area shape="rect" coords="49,104,76,149" onMouseOver={() => setHighlight('biceps')}/>
                    <area shape="rect" coords="174,104,198,148" onMouseOver={() => setHighlight('biceps')}/>
                </map>
                <div className="body-parts">
                    <img src="/assets/Biceps.png" id="biceps" style={{width: '250px', top: '15px', left: '1px', opacity: highlight != 'biceps' ? 0 : 1}} alt="Biceps"/>
                </div>
            </div>
        </div>
        <div className="flex flex-col grow gap-4" style={{flex: 2}} id="exercise-list">
            {exerciseElements}
        </div>
    </>
}