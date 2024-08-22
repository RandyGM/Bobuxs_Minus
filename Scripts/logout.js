// logout.js
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('ticketCount'); // Elimina el conteo de tickets
    window.location.href = '../login.html'; // Redirige a la página de inicio de sesión
});