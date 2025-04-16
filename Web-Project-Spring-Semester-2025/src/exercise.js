import { capitalize } from "../main";
import { loadExercises } from "./db";

document.addEventListener("DOMContentLoaded", async function() {
    // Load exercises from JSON
    const exercises = await loadExercises();

    // Get URL query params (the name=squat you see for example)
    const urlParams = new URLSearchParams(window.location.search);
    
    const name = urlParams.get('name');
    if (name) {
        // Find the current exercise
        const exercise = exercises.find(exercise => exercise.name == name);
        
        if (exercise) {
            document.getElementById('exercise-title').innerHTML = exercise.title;
            document.getElementById('exercise-video').src = exercise.video;
            document.getElementById('exercise-difficulty').innerHTML = capitalize(exercise.difficulty);
            document.getElementById('exercise-description').innerHTML = exercise.description;
        }
    }
});