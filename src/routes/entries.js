const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/entriesController');

router.get('/', ctrl.listEntries);
router.get('/:id', ctrl.getEntryById);
router.post('/', ctrl.createEntry);
router.put('/:id', ctrl.updateEntry);
router.delete('/:id', ctrl.deleteEntry);

module.exports = router;
