const repo = require('../repository/entriesRepo');

async function listEntries(req, res, next){
  try{
    const { mood, from, to, limit, sort } = req.query;
    const options = { mood, from, to, limit: limit ? Number(limit) : undefined, sort };
    const list = await repo.query(options);
    res.json(list);
  }catch(err){ next(err); }
}

async function getEntryById(req, res, next){
  try{
    const id = req.params.id; 
    const entry = await repo.getById(id);
    if(!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  }catch(err){ next(err); }
}
async function createEntry(req, res, next){
  try{
    const { mood, note, date } = req.body; 
    if(!mood || !date) return res.status(400).json({ error: 'mood and date are required' });
    const created = await repo.create({ mood, note, date });
    res.status(201).json(created);
  }catch(err){ next(err); }
}

async function updateEntry(req, res, next){
  try{
    const id = req.params.id;
    const changes = req.body;
    const updated = await repo.update(id, changes);
    if(!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  }catch(err){ next(err); }
}

async function deleteEntry(req, res, next){
  try{
    const id = req.params.id;
    const ok = await repo.remove(id);
    if(!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  }catch(err){ next(err); }
}

module.exports = { listEntries, getEntryById, createEntry, updateEntry, deleteEntry };
