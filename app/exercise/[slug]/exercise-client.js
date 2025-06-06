"use client";

import { deleteVideo } from "@/app/actions";
import AddToFavoritesButton from "@/components/add-to-favorites-button";
import Modal from "@/components/modal";
import { capitalize } from "@/lib/utils";
import { useMainStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExerciseClient({ exercise }) {
    const user = useMainStore(state => state.user);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();

    let adminButtons;

    async function deleteExericse() {
        setDeleteModal(true);
    }

    if (user.isAdmin) {
        adminButtons = <div className="mt-auto">
            <button className="btn" onClick={deleteExericse}>Delete</button>
        </div>;
    }

    return <div className="flex w-full gap-6">
        <iframe className="xl:w-[70%] lg:w-[60%] aspect-video w-full rounded" id="exercise-video"
            src={exercise.video} title="How to squat ✅"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen="allowfullscreen"> 
        </iframe>
        <div className="content p-4 overflow-hidden relative h-full" style={{flex: 1}}>
            <div className="flex gap-3 items-center">
                <strong className="text-2xl " id="exercise-title">
                    {exercise.title}
                </strong>
                <div className="ml-auto flex gap-1">
                    <AddToFavoritesButton exerciseId={exercise._id.toString()} />
                    {adminButtons}
                </div>
            </div>
            <br/>
            <span id="exercise-difficulty">
                {capitalize(exercise.difficulty)}
            </span>
            <br/>
            <br/>
            <p className="whitespace-break-spaces" id="exercise-description">
                {exercise.description}
            </p>
        </div>

        {deleteModal && <Modal 
            title="Are you sure you want to delete this exercise?"
            description="This acttion is irreversible!"
            buttons={[
                { text: 'Yes', click: async () => {
                    await deleteVideo(exercise._id);        
                    router.push('/browse');
                } },
                { text: 'No', click: () => setDeleteModal(false) }
            ]}
        />}
    </div>;
}