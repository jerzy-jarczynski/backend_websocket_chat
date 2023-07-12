const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));

// catching bad links
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// show app on /
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

// start server
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});