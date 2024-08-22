//bobux_pack.js
const packages = [
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 1000 Tickets",
        robux: 100,
        price: 1000
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 4000 Tickets",
        robux: 500,
        price: 4000
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 8000 Tickets",
        robux: 1000,
        price: 8000
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 8400 Tickets",
        robux: 1500,
        price: 8400
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 9000 Tickets",
        robux: 2000,
        price: 9000
    }
];

// Función para generar los paquetes
function generatePackages() {
    const container = document.getElementById('packages-container');

    packages.forEach(pkg => {
        const packageDiv = document.createElement('div');
        packageDiv.className = 'package';

        packageDiv.innerHTML = `
            <img src="${pkg.imgSrc}" alt="${pkg.title}" class="img-tier">
            <h2>${pkg.title}</h2>
            <p><span> - ${pkg.robux} Get Bobux -</span></p>
            <p>Price ${pkg.price} Tickets</p>
            <a href="#" class="btn" data-price="${pkg.price}">Buy Bobux</a>
        `;

        container.appendChild(packageDiv);
    });

    // Añadir el evento click a los botones de compra
    const buyButtons = document.querySelectorAll('.btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const price = parseInt(this.getAttribute('data-price'));
            const confirmPurchase = confirm(`Are you sure you want to spend ${price} tickets to buy this package?`);

            if (confirmPurchase) {
                handlePurchase(price);
            } else {
                alert('Purchase canceled.');
            }
        });
    });
}

// Función para manejar la compra de paquetes
function handlePurchase(price) {
    const ticketCountElement = document.getElementById('ticket-count');
    let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 0;

    if (ticketCount >= price) {
        // Reducir el conteo de tickets
        ticketCount -= price;
        ticketCountElement.textContent = ticketCount;
        localStorage.setItem('ticketCount', ticketCount);

        // Guardar los tickets actualizados en la base de datos
        saveTicketsToDatabase(ticketCount);

        alert('Purchase successful!');
    } else {
        alert('Not enough tickets to complete the purchase.');
    }
}

// Función para guardar los tickets en la base de datos
async function saveTicketsToDatabase(ticketCount) {
    const username = localStorage.getItem('username');
    try {
        await fetch('http://localhost:3000/api/updateTickets', {
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

// Llamar a la función para generar los paquetes cuando se cargue la página
document.addEventListener('DOMContentLoaded', generatePackages);

