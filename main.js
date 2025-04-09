document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnTheme").addEventListener("click", function() {
        document.documentElement.classList.toggle("dark");
        document.getElementById("btnTheme").innerText= document.documentElement.classList.contains("dark")?"🌙":"☀️";
    });
});