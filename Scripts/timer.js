//Timer.js
document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const ticketCountElement = document.getElementById('ticket-count');
    const username = localStorage.getItem('username');

    // Duración total de cada ciclo en milisegundos (30 segundos)
    const cycleDuration = 30000;

    // Guardar o cargar la hora de inicio del ciclo
    let cycleStart = parseInt(localStorage.getItem('cycleStart'));

    if (!cycleStart) {
        cycleStart = Date.now(); // Si no existe, la configuramos como el tiempo actual
        localStorage.setItem('cycleStart', cycleStart);
    }

    // Función para guardar los tickets en la base de datos
    async function saveTicketsToDatabase(ticketCount) {
        try {
            await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-qoxmmip/endpoint/api/updateTickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, tickets: ticketCount })
            });
        } catch (error) {
            console.error('Error al guardar los tickets en la base de datos:', error);
        }
    }

    // Función para incrementar automáticamente los tickets cuando el ciclo se completa
    function incrementTicketCount() {
        let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 0;
        ticketCount++;
        ticketCountElement.textContent = ticketCount;
        localStorage.setItem('ticketCount', ticketCount);
        saveTicketsToDatabase(ticketCount);

        // Reiniciar el ciclo
        cycleStart = Date.now();
        localStorage.setItem('cycleStart', cycleStart);
    }

    // Función para actualizar y mostrar el temporizador
    function updateTimer() {
        const now = Date.now();
        const elapsedTime = now - cycleStart;
        const timeRemaining = cycleDuration - elapsedTime;

        if (timeRemaining <= 0) {
            incrementTicketCount(); // Incrementa el ticket cuando el tiempo se completa
        }

        // Mostrar el tiempo restante en segundos
        const seconds = Math.floor((timeRemaining > 0 ? timeRemaining : 0) / 1000);
        timerElement.textContent = `00:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    // Actualizar el temporizador cada segundo
    setInterval(updateTimer, 1000);
});
