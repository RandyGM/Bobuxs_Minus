import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Ruta para la raíz
app.get('/', (req, res) => {

    //Normal
    res.sendFile(path.resolve(__dirname, 'index.html'));
    res.sendFile(path.resolve(__dirname, 'download.html'));
    res.sendFile(path.resolve(__dirname, 'login.html'));
    res.sendFile(path.resolve(__dirname, 'signup.html'));

    //Login
    res.sendFile(path.resolve(__dirname, 'Login_v','index_sign.html'));
    res.sendFile(path.resolve(__dirname, 'Login_v','download_sign.html'));
    res.sendFile(path.resolve(__dirname, 'Login_v','tickets.html'));

    //Scripts
    res.sendFile(path.resolve(__dirname, 'Scripts', 'bobux_pack.js'));
    res.sendFile(path.resolve(__dirname, 'Scripts', 'signup.js'));
    res.sendFile(path.resolve(__dirname, 'Scripts', 'login.js'));
    res.sendFile(path.resolve(__dirname, 'Scripts', 'logout.js'));
    res.sendFile(path.resolve(__dirname, 'Scripts', 'timer.js'));
    res.sendFile(path.resolve(__dirname, 'Scripts', 'tickes_pruchase.js'));

    //Extra
    res.sendFile(path.resolve(__dirname, 'Img'));
    res.sendFile(path.resolve(__dirname, 'style.css'));
    res.sendFile(path.resolve(__dirname, 'server.mjs'));
    
});

// Ruta para el registro de usuarios
app.post('/api/insert', async (req, res) => {
    const data = req.body;

    try {
        const response = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-qoxmmip/endpoint/data/v1/action/insertOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'KI8H0DBcDC6RY19f1xttZK95Z5G0kSruYROkhmCAW0UXXjLxWEy0eINJobXzTTP2'
            },
            body: JSON.stringify({
                dataSource: 'database',
                database: 'DB',
                collection: 'Users',
                document: data
            })
        });

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Error al enviar datos:', error);
        res.status(500).json({ error: 'Error al enviar datos' });
    }
});

// Ruta para el inicio de sesión
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const response = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-qoxmmip/endpoint/data/v1/action/findOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'KI8H0DBcDC6RY19f1xttZK95Z5G0kSruYROkhmCAW0UXXjLxWEy0eINJobXzTTP2'
            },
            body: JSON.stringify({
                dataSource: 'database',
                database: 'DB',
                collection: 'Users',
                filter: { name }
            })
        });

        const result = await response.json();
        const user = result.document;

        if (user && user.password === password) {
            res.json({
                message: 'Inicio de sesión exitoso',
                tickets: user.tickets // Asegúrate de enviar los tickets correctamente
            });
        } else {
            res.status(401).json({ error: 'Nombre o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Ruta para actualizar los tickets del usuario
app.post('/api/updateTickets', async (req, res) => {
    const { name, tickets } = req.body;

    try {
        const response = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-qoxmmip/endpoint/data/v1/action/updateOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'KI8H0DBcDC6RY19f1xttZK95Z5G0kSruYROkhmCAW0UXXjLxWEy0eINJobXzTTP2'
            },
            body: JSON.stringify({
                dataSource: 'database',
                database: 'DB',
                collection: 'Users',
                filter: { name: name },
                update: {
                    $set: { tickets: tickets }
                }
            })
        });

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Error al actualizar los tickets:', error);
        res.status(500).json({ error: 'Error al actualizar los tickets' });
    }
    
});

app.listen(port, () => {
    console.log(`Servidor escuchando en :${port}`);
});
