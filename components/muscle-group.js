"use client"

import { capitalize } from "@/lib/utils"
import classNames from "classnames"
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useMemo } from "react"

export default function MuscleGroup({ name, tags, setTags }) {
    const chosen = useMemo(() => tags && tags.indexOf(name) !== -1, [name, tags]);

    const classes = classNames('muscle-group p-4! gap-2 flex flex-col items-center', {
        chosen
    });

    function chooseGroup() {
        let newTags = tags ?? [];
        if (chosen) {
            newTags.splice(newTags.indexOf(name), 1);
        } else {
            newTags.push(name);
        }
        setTags([...newTags]);
    }

    return <button className={classes} onClick={chooseGroup}>
        <img src={`/assets/${name}.png`} width="100" alt={name}/>
        <span>{name.split('_').map(s => capitalize(s)).join(' ')}</span>
    </button>
}