const express = require('express');
const path = require('path');
const entriesRouter = require('./routes/entries');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(logger);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/entries', entriesRouter);

app.get('/health', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
