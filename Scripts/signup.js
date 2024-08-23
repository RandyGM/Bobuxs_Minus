//Signup.js
document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const data = {
        name: name,
        email: email,
        password: password,
        tickets: 0
    };
    
    try {
        const response = await fetch('MONGODB_INSERT_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            alert(`Error al enviar datos: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al enviar datos:', error);
        alert('Error al enviar datos. Verifica la consola para más detalles.');
    }
});
