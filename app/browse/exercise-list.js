"use client";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MuscleGroup from "../../components/muscle-group";
import { findExercises } from "../actions";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export default function ExerciseList({ initialExercises }) {
  const [query, setQuery] = useQueryState("query", { defaultValue: "" });
  const [diff, setDiff] = useQueryState("difficulty", { defaultValue: "any" });
  const [tags, setTags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [exercises, setExercises] = useState(initialExercises);
  const initial = useRef(false);

  const muscleGroups = [
    "biceps",
    "chest",
    "abs",
    "obliques",
    "back",
    "hamstrings",
    "quads",
    "shoulders",
    "triceps",
    "lower_back",
    "calves",
    "glutes",
    "trapezius",
    "abductors",
    "adductors",
    "forearms",
    "neck",
  ];

  const availableTags = [
    "lower_body",
    "strength",
    "bodyweight",
    "no_equipment",
    "core",
    "cardio",
    "explosive",
    "full_body",
    "balance",
  ];

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
    }

    const effectiveTags = tags.length > 0 ? tags : undefined;
    const effectiveDiff = diff === "any" ? undefined : diff;

    findExercises(query, effectiveDiff, effectiveTags).then((data) =>
      setExercises(data)
    );
  }, [tags, query, diff]);

  const exerciseElements = exercises.map((exercise, i) => (
    <Link
      href={`exercise/${encodeURIComponent(exercise.name)}`}
      className="content exercise"
      key={i}
    >
      <img src={exercise.thumbnail} width="150" alt="Exercise Thumbnail" />
      <div className="flex flex-col">
        <strong className="text-2xl">{exercise.title}</strong>
        <span>{capitalize(exercise.difficulty)}</span>
      </div>
    </Link>
  ));

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
              onInput={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          <div className="flex flex-col gap-1 grow">
            <label htmlFor="exercises-diff">Difficulty</label>
            <select
              className="input"
              id="exercises-diff"
              value={diff}
              onChange={(e) => setDiff(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Muscle Groups */}
        <div>
          <span>Muscle Groups</span>
          <div
            className="body flex gap-3 mx-auto flex-wrap justify-center overflow-auto"
            style={{ minHeight: "350px", maxHeight: "260px" }}
          >
            {muscleGroups.map((group, i) => (
              <MuscleGroup name={group} key={i} />
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <span>Tags</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableTags.map((tag, i) => {
              const isActive = tags.includes(tag);
              return (
                <button
                  key={i}
                  onClick={() => {
                    const newTags = isActive
                      ? tags.filter((t) => t !== tag)
                      : [...tags, tag];
                    setTags(newTags);
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-4" id="exercise-list">
        {exerciseElements.length ? (
          exerciseElements
        ) : (
          <b className="text-lg mx-auto">No exercises were found!</b>
        )}
      </div>
    </>
  );
}
