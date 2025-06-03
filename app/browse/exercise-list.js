"use client"

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MuscleGroup from "../../components/muscle-group";
import { findExercises } from "../actions";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export default function ExerciseList({ initialExercises, avoidMuscles = [] }) {
    /* ---------------- state ---------------- */
    const [query, setQuery]   = useQueryState("query",      { defaultValue: ""   });
    const [diff,  setDiff]    = useQueryState("difficulty", { defaultValue: "any"});
    const [tags]              = useQueryState("tags", parseAsArrayOf(parseAsString));
    const [exercises, setExercises] = useState(initialExercises);

    // Always use the latest avoidMuscles prop
    const avoid = useRef(avoidMuscles);
    useEffect(() => {
        avoid.current = avoidMuscles;
    }, [avoidMuscles]);

    /* -------------- constants -------------- */
    const muscleGroups = [
      "biceps", "chest", "abs", "obliques", "back", "hamstrings", "quads",
      "shoulders", "triceps", "lower_back", "calves", "glutes",
      "trapezius", "abductors", "adductors", "forearms", "neck"
    ];

    /* ---------- fetch on filter change ---------- */
    useEffect(() => {
      findExercises(query, diff, tags, {}).then(data => {
        setExercises(data);
      });
    }, [query, diff, tags]);


    const filteredExercises = exercises.filter(ex => {
    const exerciseTags = ex.tags?.map(tag => tag.toLowerCase()) || [];
    const avoidList = avoid.current.map(m => m.toLowerCase());

    const hasAvoided = exerciseTags.some(tag => avoidList.includes(tag));
    const result = !hasAvoided;

    return result;
    });

    /* -------------- render list -------------- */
    const exerciseElements = filteredExercises.map(ex => (
      <Link
        href={`exercise/${encodeURIComponent(ex.name)}`}
        className="content exercise"
        key={ex._id ?? ex.name}
      >
        <img src={ex.thumbnail} width="150" alt={`${ex.title} thumbnail`} />
        <div className="flex flex-col">
          <strong className="text-2xl">{ex.title}</strong>
          <span>{capitalize(ex.difficulty)}</span>
        </div>
      </Link>
    ));

    /* -------------- UI -------------- */
    return (
      <>
        <div className="content lg:self-start flex flex-col gap-4 flex-2">
          <strong className="text-3xl mx-auto">Filters</strong>

          {/* search + difficulty */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex flex-col gap-1 grow">
              <label htmlFor="exercises-query">Search</label>
              <input
                className="input"
                id="exercises-query"
                value={query}
                onInput={e => setQuery(e.target.value)}
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

          {/* muscle groups picker (visual only) */}
          <div>
            <span>Muscle Groups</span>
            <div
              className="body flex gap-3 mx-auto flex-wrap justify-center overflow-auto"
              style={{ minHeight: "350px", maxHeight: "260px" }}
            >
              {muscleGroups.map(g => (
                <MuscleGroup name={g} key={g} />
              ))}
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