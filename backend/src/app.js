const express = require('express');
const cors = require('cors');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Aurax API running' });
});

module.exports = app;