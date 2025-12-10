const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/entriesController');

// GET /api/entries  (query params: mood, from, to, limit, sort)
router.get('/', ctrl.listEntries);
// GET /api/entries/:id
router.get('/:id', ctrl.getEntryById);
// POST /api/entries
router.post('/', ctrl.createEntry);
// PUT /api/entries/:id
router.put('/:id', ctrl.updateEntry);
// DELETE /api/entries/:id
router.delete('/:id', ctrl.deleteEntry);

module.exports = router;
