import { capitalize } from "@/lib/utils";
import Tag from "./tag";

export default function ListExercise({ exercise, children, preContent, content, tags = true }) {
    let tagHolder = null;

    if (tags && exercise.tags) {
        tagHolder = <div className="flex gap-1 mt-auto flex-wrap max-w-sm 2xl:max-w-xl">
            {exercise.tags?.map((tag, i) => <Tag key={i} tag={tag}/>)}
        </div>
    }

    return <div className="content exercise flex-wrap max-sm:flex-col items-center">
        {preContent}
        <img src={exercise.thumbnail} className="thumbnail" alt={`${exercise.title} thumbnail`} />
        <div className="flex flex-col flex-wrap gap-2">
            <strong className="text-2xl">{exercise.title}</strong>
            <span className="text-left">{capitalize(exercise.difficulty)}</span>
            {tagHolder}
            {content}
        </div>
        {children}
    </div>
}