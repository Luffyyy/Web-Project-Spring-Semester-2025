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
            document.querySelector('#exercise-title').innerHTML = exercise.title;
        }
    }
});