// This simply does a fetch request and fetches the JSON data from data folder
async function loadExercises() {
    const data = await fetch('data/exercises.json');
    return await data.json();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnTheme").addEventListener("click", function() {
        document.documentElement.classList.toggle("dark");
        document.getElementById("btnTheme").innerText= document.documentElement.classList.contains("dark")?"🌙":"☀️";
    });
});