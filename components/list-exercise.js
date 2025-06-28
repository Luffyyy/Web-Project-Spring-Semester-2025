import { capitalize } from "@/lib/utils";
import Tag from "./tag";

export default function ListExercise({ exercise, children, preContent, content }) {
    return <div className="content exercise flex-wrap" >
        {preContent}
        <img src={exercise.thumbnail} className="thumbnail self-center" alt={`${exercise.title} thumbnail`} />
        <div className="flex flex-col flex-wrap gap-2">
            <strong className="text-2xl">{exercise.title}</strong>
            <span className="text-left">{capitalize(exercise.difficulty)}</span>
            {content}
            <div className="flex gap-1 mt-auto flex-wrap">
                {exercise.tags?.map((tag, i) => <Tag key={i} tag={tag}/>)}
            </div>
        </div>
        {children}
    </div>
}