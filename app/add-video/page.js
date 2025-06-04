"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addVideo } from "../actions";
import { muscleGroups, availableTags } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import MuscleGroup from "@/components/muscle-group";

export default function AddVideosPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const toggleTag = (tag) => {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const toggleMuscle = (muscle) => {
        setSelectedMuscles((prev) =>
            prev.includes(muscle)
                ? prev.filter((m) => m !== muscle)
                : [...prev, muscle]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !title.trim() ||
            !videoUrl.trim() ||
            !gifUrl.trim() ||
            !description.trim() ||
            !difficulty ||
            tags.length === 0 ||
            selectedMuscles.length === 0
        ) {
            setError("Please fill out all fields including tags and muscle groups.");
            return;
        }

        setError("");

        await addVideo({
            title,
            videoUrl,
            description,
            difficulty,
            tags,
            gifUrl,
            muscleGroups: selectedMuscles,
        });

        setSuccess(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-center">Add Video</h1>

                {error && <p className="text-red-600 text-center">{error}</p>}

                <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="YouTube Video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="GIF URL"
                    value={gifUrl}
                    onChange={(e) => setGifUrl(e.target.value)}
                />
                <textarea
                    className="input"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="input"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="">Select Difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <div>
                    <p className="font-semibold mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <label key={tag} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={tags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                />
                                <span>{tag.split("_").map(capitalize).join(" ")}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold mb-2">Targeted Muscle Groups</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {muscleGroups.map((muscle) => (
                            <div
                                key={muscle}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleMuscle(muscle);
                                }}
                                className={`cursor-pointer rounded-md p-1 transition-opacity duration-150 ${selectedMuscles.includes(muscle)
                                        ? "opacity-100 border border-blue-500"
                                        : "opacity-50"
                                    }`}
                            >
                                <MuscleGroup name={muscle} />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn self-center mt-4">
                    Add Video
                </button>
            </form>

            {success && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
                        <h2 className="text-2xl font-bold mb-4">Video Added!</h2>
                        <p className="text-gray-700 mb-6">
                            Your video was added successfully.
                        </p>

                        <button
                            className="btn w-full"
                            onClick={() => {
                                router.push("/");
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
