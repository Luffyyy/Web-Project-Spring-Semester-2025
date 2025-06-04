"use client";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MuscleGroup from "../../components/muscle-group";
import { findExercises, findFavoriteExercises } from "../actions";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import classNames from "classnames";
import Tag from "@/components/tag";

export const muscleGroups = [
    "biceps", "chest", "abs", "obliques", "back", "hamstrings", "quads",
    "shoulders", "triceps", "lower_back", "calves", "glutes",
    "trapezius", "abductors", "adductors", "forearms", "neck"
];

export const availableTags = [
    "lower_body", "strength", "bodyweight", "no_equipment", "core",
    "cardio", "explosive", "full_body", "balance"
];

export default function ExerciseList({ initialExercises, isFavorites = false, avoidMuscles = [] }) {
    /* ---------------- state ---------------- */
    const [query, setQuery]   = useQueryState("query",      { defaultValue: ""   });
    const [diff,  setDiff]    = useQueryState("difficulty", { defaultValue: "any"});
    const [tags,  setTags]    = useQueryState("tags", parseAsArrayOf(parseAsString));
    const [exercises, setExercises] = useState(initialExercises);

    // Track avoidMuscles reactively
    const avoid = useRef(avoidMuscles);
    useEffect(() => {
        avoid.current = avoidMuscles;
    }, [avoidMuscles]);

    const initial = useRef(false);

    /* -------------- fetch on filter change -------------- */
    useEffect(() => {
        if (!initial.current) {
            initial.current = true;
        }

        const fetch = isFavorites
            ? findFavoriteExercises
            : findExercises;

        fetch(query, diff, tags).then(data => {
            setExercises(data);
        });
    }, [tags, query, diff, isFavorites]);

    /* ---------------- filter out avoided muscles ---------------- */
    const filteredExercises = exercises.filter(ex => {
        const exerciseTags = ex.tags?.map(tag => tag.toLowerCase()) || [];
        const avoidList = avoid.current.map(m => m.toLowerCase());
        const hasAvoided = exerciseTags.some(tag => avoidList.includes(tag));
        return !hasAvoided;
    });

    /* ---------------- render exercises ---------------- */
    const exerciseElements = filteredExercises.map((exercise, i) => (
        <Link
            href={`exercise/${encodeURIComponent(exercise.name)}`}
            className="content exercise"
            key={exercise._id ?? i}
        >
            <img src={exercise.thumbnail} width="150" alt={`${exercise.title} thumbnail`} />
            <div className="flex flex-col">
                <strong className="text-2xl">{exercise.title}</strong>
                <span>{capitalize(exercise.difficulty)}</span>
            </div>
        </Link>
    ));

    /* ---------------- UI ---------------- */
    return (
        <>
            <div className="content lg:self-start flex flex-col gap-4 flex-2">
                <strong className="text-3xl mx-auto">Filters</strong>

                <div className="flex gap-2 flex-wrap">
                    <div className="flex flex-col gap-1 grow">
                        <label htmlFor="exercises-query">Search</label>
                        <input
                            className="input"
                            id="exercises-query"
                            onInput={e => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                    <div className="flex flex-col gap-1 grow">
                        <label htmlFor="exercises-diff">Difficulty</label>
                        <select
                            className="input"
                            id="exercises-diff"
                            value={diff}
                            onChange={e => setDiff(e.target.value)}
                        >
                            <option value="any">Any</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div>
                    <span>Muscle Groups</span>
                    <div
                        className="body flex gap-3 mx-auto flex-wrap justify-center overflow-auto"
                        style={{ minHeight: "350px", maxHeight: "260px" }}
                    >
                        {muscleGroups.map((group, i) => (
                            <MuscleGroup name={group} tags={tags} setTags={setTags} key={i} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-3">Tags</div>
                    <div className="flex flex-wrap gap-1">
                        {availableTags.map((tag, i) => <Tag key={i} tag={tag} tags={tags} setTags={setTags}/>)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 flex-4" id="exercise-list">
                {exerciseElements.length
                    ? exerciseElements
                    : <b className="text-lg mx-auto">No exercises were found!</b>}
            </div>
        </>
    );
}
