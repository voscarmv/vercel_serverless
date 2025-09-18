const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const KEY = process.env.KEY;
// const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

app.use(cors({
    // origin: [FRONTEND_ORIGIN],
    origin: [], // Accept all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/items', (req, res) => {
  res.json({ message: 'GET all items', keyUsed: KEY });
});

app.post('/items', (req, res) => {
  res.json({ message: 'POST new item', dataReceived: req.body });
});

app.get('/items/:id', (req, res) => {
  res.json({ message: `GET item with id ${req.params.id}` });
});

app.put('/items/:id', (req, res) => {
  res.json({ message: `PUT update item with id ${req.params.id}`, dataReceived: req.body });
});

app.delete('/items/:id', (req, res) => {
  res.json({ message: `DELETE item with id ${req.params.id}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});