import { loadUsers } from './db.js';
const html = document.documentElement;
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

 loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); //if event not from submit value is false

    const usernameOrEmail = document.getElementById('userInput').value;
    const password = document.getElementById('passInput').value;

    let nameOrEmail = 'test';
    let pass = 'password';
    const users = await loadUsers(); // Load users from the JSON file
    let user =  users.find(u=>u.username === usernameOrEmail || u.email === usernameOrEmail);

    if(user != undefined){
        nameOrEmail = user.username;
        pass = user.password;
    }

    if (usernameOrEmail === nameOrEmail && password === pass) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        loginMessage.textContent = 'Login successful!';
        loginMessage.classList.remove('text-red-500');
        loginMessage.classList.add('text-green-500');
        setTimeout(() => {
            window.location.href = 'index.html'; //will be something else later
        }, 2000);
    } else {
        loginMessage.textContent = 'Invalid username/email or password.';
        loginMessage.classList.remove('text-green-500');
        loginMessage.classList.add('text-red-500');
    }
});