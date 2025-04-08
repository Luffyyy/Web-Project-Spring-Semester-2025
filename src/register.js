document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('userInput').value;
    const email = document.getElementById('mailInput').value;
    const password = document.getElementById('passInput').value;
    const confirmPassword = document.getElementById('confirmInput').value;
    const dob = document.getElementById('dateInput').value;
    const messageDiv = document.getElementById('registerMessage');
    messageDiv.textContent = "";

    if (password !== confirmPassword) {
        messageDiv.textContent = "Passwords do not match.";
        messageDiv.classList.remove("text-green-500");
        messageDiv.classList.add("text-red-500");
        return;
    }

    try {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username || user.email === email)) {
            messageDiv.textContent = "Username or email already exists.";
            messageDiv.classList.remove("text-green-500");
            messageDiv.classList.add("text-red-500");
            return;
        }

        users.push({ username, email, password, dob });

        localStorage.setItem('users', JSON.stringify(users));

        messageDiv.textContent = "Registration successful! (Data stored in local storage)";
        messageDiv.classList.remove("text-red-500");
        messageDiv.classList.add("text-green-500");

    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = "An error occurred during registration.";
        messageDiv.classList.remove("text-green-500");
        messageDiv.classList.add("text-red-500");
    }
});