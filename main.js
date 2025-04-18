// Capitalizes words like hello -> Hello
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setTheme(initial = false) {
    document.documentElement.classList.toggle("dark");
    document.getElementById("btnTheme").innerText= document.documentElement.classList.contains("dark")?"🌙":"☀️";

    if (!initial) {
        localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login');
    const registerBtn = document.getElementById('register');
    const avatar = document.getElementById('avatar');
    const logoutButton = document.getElementById('logoutButton');

    // Check if a user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Hide Login/Register buttons and show Logout/User Picture
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutButton.style.display = 'block';
        avatar.style.display = 'block';
        avatar.src = loggedInUser.picture || 'assets/default-avatar.png'; // Use default if no picture
    } else {
        // Show Login/Register buttons and hide Logout/User Picture
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutButton.style.display = 'none';
        avatar.style.display = 'none';
    }

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Clear logged-in user
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutButton.style.display = 'none';
        avatar.style.display = 'none';
    });

    // Mobile menu
    const btnMenu = document.getElementById("btn-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    btnMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
    
    // Theme
    document.getElementById("btnTheme").addEventListener("click", () => setTheme());
    if (localStorage.getItem('theme') === 'light') {
        setTheme(true);
    }
});