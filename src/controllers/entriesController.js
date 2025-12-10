const repo = require('../repository/entriesRepo');

// GET /api/entries
async function listEntries(req, res, next){
  try{
    const { mood, from, to, limit, sort } = req.query; // req.query usage
    const options = { mood, from, to, limit: limit ? Number(limit) : undefined, sort };
    const list = await repo.query(options);
    res.json(list);
  }catch(err){ next(err); }
}

// GET /api/entries/:id
async function getEntryById(req, res, next){
  try{
    const id = req.params.id; // req.params usage
    const entry = await repo.getById(id);
    if(!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  }catch(err){ next(err); }
}

// POST /api/entries
async function createEntry(req, res, next){
  try{
    const { mood, note, date } = req.body; // body parsing
    if(!mood || !date) return res.status(400).json({ error: 'mood and date are required' });
    const created = await repo.create({ mood, note, date });
    res.status(201).json(created);
  }catch(err){ next(err); }
}

// PUT /api/entries/:id
async function updateEntry(req, res, next){
  try{
    const id = req.params.id;
    const changes = req.body;
    const updated = await repo.update(id, changes);
    if(!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  }catch(err){ next(err); }
}

// DELETE /api/entries/:id
async function deleteEntry(req, res, next){
  try{
    const id = req.params.id;
    const ok = await repo.remove(id);
    if(!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  }catch(err){ next(err); }
}

module.exports = { listEntries, getEntryById, createEntry, updateEntry, deleteEntry };
