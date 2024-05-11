const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory storage (replace with database for persistence)
let numbers = {};

// Validate number ID format (replace with your desired format)
function isValidNumberId(id) {
  return /^[A-Z0-9]{8}$/.test(id); // Example format
}

// Get average of all numbers
function getAverage() {
  const sum = Object.values(numbers).reduce((acc, val) => acc + val, 0);
  const count = Object.keys(numbers).length;
  return count > 0 ? sum / count : 0;
}

// Get specific number by ID
app.get('/numbers/:numberid', (req, res) => {
  const numberId = req.params.numberid;
  if (!isValidNumberId(numberId)) {
    return res.status(400).send('Invalid number ID format');
  }

  if (!numbers[numberId]) {
    return res.status(404).send('Number not found');
  }

  res.json({ number: numberId, value: numbers[numberId] });
});

// Add a new number (replace with appropriate logic for adding numbers)
app.post('/numbers/:numberid', (req, res) => {
  const numberId = req.params.numberid;
  const value = req.body.value;

  if (!isValidNumberId(numberId)) {
    return res.status(400).send('Invalid number ID format');
  }

  if (isNaN(value)) {
    return res.status(400).send('Invalid number value');
  }

  numbers[numberId] = value;
  res.status(201).send('Number added successfully');
});

app.get('/average', (req, res) => {
  res.json({ average: getAverage() });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
