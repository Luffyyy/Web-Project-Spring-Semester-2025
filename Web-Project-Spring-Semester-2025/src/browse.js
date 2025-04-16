import { capitalize } from "../main";
import { loadExercises } from "./db";

// Get URL query params (the name=squat you see for example)
const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", async function() {
    refreshList();

    const query = document.getElementById('exercises-query');
    const diff = document.getElementById('exercises-diff');

    query.addEventListener('input', e => filterElementChanged(e, 'query'));
    diff.addEventListener('change', e => filterElementChanged(e, 'difficulty'));
    query.value = urlParams.get('query');
    diff.value = urlParams.get('difficulty') ?? 'any';
});


// Fires when some filter element changes and handles URL param stuff + refreshing list
function filterElementChanged(e, key) {
    urlParams.set(key, e.target.value);
    // Changes the URL param without refreshing the page
    window.history.replaceState(null, null, `?${urlParams.toString()}`);
    refreshList();
}

// Handles refreshing the list in case of a change from one of the filters
async function refreshList() {
    // Load exercises from JSON
    const exercises = await loadExercises();
    const exerciseList = document.querySelector('#exercise-list');
    const query = urlParams.get('query');
    const diff = urlParams.get('difficulty') ?? 'any';

    exerciseList.innerHTML = '';
    let foundOne = false;
    for (const exercise of exercises) {
        if ((!query || exercise.title.toLowerCase().match(query.toLowerCase())) && (diff == 'any' || exercise.difficulty === diff)) {
            exerciseList.innerHTML += `
                <a href="exercise.html?name=${encodeURIComponent(exercise.name)}" class="content exercise">
                    <img src="${exercise.thumbnail}" width="150">
                    <div class="flex flex-col">
                        <strong class="text-2xl">${exercise.title}</strong>
                        <span>${capitalize(exercise.difficulty)}</span>
                    </div>
                </a>
            `;
            foundOne = true;
        }
    }
    if (!foundOne) {
        exerciseList.innerHTML = `<strong class="text-xl">Found no exercises that match: '${query}' :/</strong>`;
        foundOne = false;
    }
}

// Mannequin code, not done yet!

let currentHighlight = null;

window.highlightPart = function(part) {
    currentHighlight = part;
    
    if (part) {
        document.getElementById(part).style.opacity = 1;
    }
}

document.addEventListener("mousemove", () => {
    if (currentHighlight !== 'biceps') {
        document.getElementById('biceps').style.opacity = 0;
    }
});