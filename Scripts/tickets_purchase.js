/* tickets_purchase.js */
document.addEventListener('DOMContentLoaded', () => {
    const ticketCountElement = document.getElementById('ticket-count');
    const username = localStorage.getItem('username');

    // Actualizar el conteo de tickets en la interfaz al cargar la página
    let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 0;
    ticketCountElement.textContent = ticketCount;

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

    // Función para manejar la compra de tickets
    function purchaseTickets(amount) {
        let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 0;
        ticketCount += amount;
        ticketCountElement.textContent = ticketCount;
        localStorage.setItem('ticketCount', ticketCount);
        saveTicketsToDatabase(ticketCount);
    }
});
