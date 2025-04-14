import { loadExercises } from "./db";

document.addEventListener("DOMContentLoaded", async function() {
    refreshList();  
});

async function refreshList() {
    // Load exercises from JSON
    const exercises = await loadExercises();

    // Get URL query params (the name=squat you see for example)
    const urlParams = new URLSearchParams(window.location.search);

    const exerciseList = document.querySelector('#exercise-list');
    const query = urlParams.get('query');

    exerciseList.innerHTML = '';
    let foundOne = false;
    for (const exercise of exercises) {
        
        if (!query || exercise.title.toLowerCase().match(query.toLowerCase())) {
            exerciseList.innerHTML += `
                <a href="exercise.html?name=${encodeURIComponent(exercise.name)}" class="content flex gap-3">
                    <img src="${exercise.thumbnail}" width="150">
                    <strong class="text-2xl">${exercise.title}</strong>
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