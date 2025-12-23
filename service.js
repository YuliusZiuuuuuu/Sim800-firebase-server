const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ganti dengan URL Firebase kamu
const FIREBASE_URL = 'https://gpsking-9dad3-default-rtdb.firebaseio.com/gpsdata.json';
const FIREBASE_SECRET = 'nYc0J3d7S74OBhlMo4wIGqrd31CZ180Zlry7IZT3';

app.post('/postgps', async (req, res) => {
    try {
        const data = req.body;

        const response = await fetch(`${FIREBASE_URL}?auth=${FIREBASE_SECRET}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        res.status(200).json({ status: 'ok', firebase: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
