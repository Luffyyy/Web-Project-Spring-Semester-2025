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
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login');
    const registerBtn = document.getElementById('register');
    const userInfo = document.getElementById('userInfo');
    const userPicture = document.getElementById('userPicture');
    const logoutButton = document.getElementById('logoutButton');

    // Check if a user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Hide Login/Register buttons and show Logout/User Picture
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userPicture.src = loggedInUser.picture || 'assets/default-avatar.png'; // Use default if no picture
    } else {
        // Show Login/Register buttons and hide Logout/User Picture
        loginBtn.style.display = 'flex';
        registerBtn.style.display = 'flex';
        userInfo.style.display = 'none';
    }

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Clear logged-in user
        loginBtn.style.display = 'flex';
        registerBtn.style.display = 'flex' // Show Login/Register buttons
        userInfo.style.display = 'none'; // Hide Logout/User Picture
    });
});