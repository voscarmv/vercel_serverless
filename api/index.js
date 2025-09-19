const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Hashids = require('hashids/cjs');

dotenv.config();

const app = express();
const port = process.env.port || 3000;
const key = process.env.key;
const salt = process.env.salt;
// const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

function keyVerify(keyver, req, res, next) {
  const key = req.headers['authorization']?.replace('Bearer ', '');
  if (!key) {
    return res.status(401).json({ message: 'No key found in headers. ' });
  }
  if (key !== keyver) {
    return res.status(401).json({ message: 'Wrong key. ' });
  }
  next();
}

function hashVerify(salt, req, res, next) {
  const id = req.params.id;
  const hashids = new Hashids(salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
  const key = req.headers['authorization']?.replace('Bearer ', '');
  const keyver = hashids.encode(id);
  if (!key) {
    return res.status(401).json({ message: 'No key found in headers. ' });
  }
  if (key !== keyver) {
    return res.status(401).json({ message: 'Wrong key. ' });
  }
  next();
}

app.use(cors({
  // origin: [FRONTEND_ORIGIN],
  origin: [], // Accept all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/items', keyVerify(key, req, res, next), (req, res) => {
  res.json({ message: 'GET all items', keyUsed: key });
});

app.post('/items', keyVerify(key, req, res, next), (req, res) => {
  res.json({ message: 'POST new item', dataReceived: req.body });
});

app.get('/items/:id', hashVerify(salt, req, res, next), (req, res) => {
  res.json({ message: `GET item with id ${req.params.id}` });
});

app.put('/items/:id', keyVerify(key, req, res, next), (req, res) => {
  res.json({ message: `PUT update item with id ${req.params.id}`, dataReceived: req.body });
});

app.delete('/items/:id', hashVerify(salt, req, res, next), (req, res) => {
  res.json({ message: `DELETE item with id ${req.params.id}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});