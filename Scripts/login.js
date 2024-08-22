document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-qoxmmip/endpoint/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.MONGODB_API_KEY
        },
        body: JSON.stringify({ name: username, password: password })
    });

    if (response.ok) {
        const result = await response.json();

        // Guardar la cantidad de tickets y el nombre de usuario en localStorage
        localStorage.setItem('ticketCount', result.tickets);
        localStorage.setItem('username', username); // Guarda el nombre de usuario

        window.location.href = 'Login_v/index_sign.html';
    } else {
        const result = await response.json();
        alert(`Error al iniciar sesión: ${result.error}`);
    }
});
