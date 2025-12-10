const express = require('express');
const path = require('path');
const entriesRouter = require('./routes/entries');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // обработка application/json
app.use(express.urlencoded({ extended: true })); // обработка form-urlencoded
app.use(logger); // собственный middleware

// Статические файлы
app.use(express.static(path.join(__dirname, '..', 'public')));

// API
app.use('/api/entries', entriesRouter);

// Простой root для проверки
app.get('/health', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }));

// Error handler (последний middleware)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
