const html = document.documentElement;
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); //if event not from submit value is false

    const usernameOrEmail = document.getElementById('userInput').value;
    const password = document.getElementById('passInput').value;

    let nameOrEmail = 'test';
    let pass = 'password';

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user =  users.find(u=>u.username === usernameOrEmail || u.email === usernameOrEmail);

    if(user != undefined){
        nameOrEmail = user.username;
        pass = user.password;
    }

    // Replace with your actual login logic (e.g., fetch request to a backend API)
    if (usernameOrEmail === nameOrEmail && password === pass) {
        loginMessage.textContent = 'Login successful!';
        loginMessage.classList.remove('text-red-500');
        loginMessage.classList.add('text-green-500');
    } else {
        loginMessage.textContent = 'Invalid username/email or password.';
        loginMessage.classList.remove('text-green-500');
        loginMessage.classList.add('text-red-500');
    }
});