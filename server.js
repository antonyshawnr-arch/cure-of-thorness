// health-vault-backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory “database”
let records = [];

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'Health Vault backend' });
});

// Get all records
app.get('/api/records', (req, res) => {
  res.json(records);
});

// Create record
app.post('/api/records', (req, res) => {
  const { date, hospital, diagnosis, prescription } = req.body;
  const newRecord = {
    id: Date.now().toString(),
    date,
    hospital,
    diagnosis,
    prescription,
  };
  records.unshift(newRecord);
  res.status(201).json(newRecord);
});

// Optional: delete one
app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  records = records.filter((r) => r.id !== id);
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Health Vault backend running on http://localhost:${PORT}`);
});
