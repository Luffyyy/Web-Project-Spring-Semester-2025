"use client"

import { capitalize } from "@/lib/utils";
import classNames from "classnames";
import { useMemo } from "react";

export default function Tag({ tag, tags, setTags }) {
    const isActive = useMemo(() => tags?.includes(tag), [tags, tag]);
    
    const toggleTag = (tag) => {
        const currTags = tags ?? [];
        const isActive = currTags.includes(tag);
        const newTags = isActive
            ? tags.filter(t => t !== tag)
            : [...currTags, tag];
        setTags(newTags);
    };

    return <button
        onClick={() => toggleTag(tag)}
        className={classNames("tag", { active: isActive })}
    >
        {tag.split("_").map(s => capitalize(s)).join(" ")}
    </button>
}