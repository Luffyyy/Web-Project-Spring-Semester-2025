"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addVideo } from "../actions";
import { muscleGroups, availableTags } from "@/lib/constants";
import MuscleGroup from "@/components/muscle-group";
import Input from "@/components/input";
import Tag from "@/components/tag";
import Modal from "@/components/modal";
import ErrorPage from "../error-page";

export default function AddVideosPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginnner");
    const [thumbnailUrl, setthumbnailUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    if (!user?.isAdmin) {
        return ErrorPage({ status: 401, message: "You don't have permissions to view this page" });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !title.trim() ||
            !videoUrl.trim() ||
            !description.trim() ||
            !difficulty ||
            tags.length === 0
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
            thumbnailUrl,
        });

        setSuccess(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-center">Add Video</h1>

                {error && <p className="text-red-600 text-center">{error}</p>}

                <Input
                    name="title"
                    type="text"
                    label="Title"
                    value={title}
                    onChange={setTitle}
                    placeholder="Title"
                    required
                />

                <Input
                    name="videoUrl"
                    type="text"
                    label="YouTube Video URL"
                    value={videoUrl}
                    onChange={setVideoUrl}
                    placeholder="YouTube Video URL"
                    required
                />

                <Input
                    name="thumbnailUrl"
                    type="text"
                    label="Thumbnail URL"
                    value={thumbnailUrl}
                    onChange={setthumbnailUrl}
                    placeholder="Thumbnail URL (Leave empty to use Youtube Video Thumbnail)"
                    required
                />

                <Input
                    name="description"
                    type="textarea"
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    placeholder="Description"
                    required
                />

                <div className="flex flex-col gap-1 grow">
                    <label htmlFor="exercises-diff">Difficulty</label>
                    <select
                        className="input"
                        value={difficulty}
                        onChange={e => setDifficulty(e.target.value)}
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <p className="font-semibold mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => <Tag key={tag} tag={tag} tags={tags} setTags={setTags}/>)}
                    </div>
                </div>

                <div>
                    <p className="font-semibold mb-2">Targeted Muscle Groups</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {muscleGroups.map((muscle) => (
                            <MuscleGroup name={muscle} tags={tags} setTags={setTags} key={muscle}/>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn self-center mt-4" onClick={handleSubmit}>
                    Add Video
                </button>
            </div>

            {success && <Modal 
                title="Video Added!"
                description="Your video was added successfully."
                buttons={[
                    { text: 'Close', click: () => router.push("/") }
                ]}
            />}
        </div>
    );
}
