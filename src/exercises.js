// This simply does a fetch request and fetches the JSON data from data folder
async function loadExercises() {
    const data = await fetch('data/exercises.json');
    return await data.json();
}