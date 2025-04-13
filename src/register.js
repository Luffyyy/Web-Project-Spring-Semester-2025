import { loadUsers } from './db.js';
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('userInput').value;
    const email = document.getElementById('mailInput').value;
    const password = document.getElementById('passInput').value;
    const confirmPassword = document.getElementById('confirmInput').value;
    const dob = document.getElementById('dateInput').value;
    const messageDiv = document.getElementById('registerMessage');
    let users = localStorage.getItem('users');
    const newUser = { username, email, password, dob };
    messageDiv.textContent = "";
    if (password !== confirmPassword) {
        messageDiv.textContent = "Passwords do not match.";
        messageDiv.classList.remove("text-green-500");
        messageDiv.classList.add("text-red-500");
        return;
    }

    try {
        if(users === null){
            users = await loadUsers();
        }
        else{
            users = JSON.parse(users) || [];
        }

        if (users.some(user => user.username === username || user.email === email)) {
            messageDiv.textContent = "Username or email already exists.";
            messageDiv.classList.remove("text-green-500");
            messageDiv.classList.add("text-red-500");
            return;
        }

        users.push(newUser); // Add the new user to the users array
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        messageDiv.textContent = "Registration successful! Redirecting to main page...";
        messageDiv.classList.remove("text-red-500");
        messageDiv.classList.add("text-green-500");
        //setTimeout(() => {
          //  window.location.href = 'dashboard.html'; //will be something else later
        //}, 2000);

    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = "An error occurred during registration.";
        messageDiv.classList.remove("text-green-500");
        messageDiv.classList.add("text-red-500");
    }
});