import { capitalize } from "@/lib/utils";

export default function ListExercise({ exercise, children, preContent, content }) {
    return <div className="content exercise" >
        {preContent}
        <img src={exercise.thumbnail} className="thumbnail self-center" alt={`${exercise.title} thumbnail`} />
        <div className="flex flex-col">
            <strong className="text-2xl">{exercise.title}</strong>
            <span className="text-left">{capitalize(exercise.difficulty)}</span>
            {content}
        </div>
        {children}
    </div>
}