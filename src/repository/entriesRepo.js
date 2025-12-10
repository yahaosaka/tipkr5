const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'entries.json');

async function readAll(){
  try{
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  }catch(err){
    if(err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeAll(data){
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

async function query(options){
  let items = await readAll();
  if(options.mood) items = items.filter(i => i.mood === options.mood);
  if(options.from) items = items.filter(i => i.date >= options.from);
  if(options.to) items = items.filter(i => i.date <= options.to);
  if(options.sort === 'date_desc') items.sort((a,b)=> b.date.localeCompare(a.date));
  else items.sort((a,b)=> a.date.localeCompare(b.date));
  if(options.limit) items = items.slice(0, options.limit);
  return items;
}

async function getById(id){
  const items = await readAll();
  return items.find(i => i.id === id) || null;
}

async function create({ mood, note, date }){
  const items = await readAll();
  const item = {
    id: uuidv4(),
    mood,
    note: note || '',
    date: date,
    createdAt: new Date().toISOString()
  };
  items.push(item);
  await writeAll(items);
  return item;
}

async function update(id, changes){
  const items = await readAll();
  const idx = items.findIndex(i => i.id === id);
  if(idx === -1) return null;
  const updated = { ...items[idx], ...changes, updatedAt: new Date().toISOString() };
  items[idx] = updated;
  await writeAll(items);
  return updated;
}

async function remove(id){
  let items = await readAll();
  const origLen = items.length;
  items = items.filter(i => i.id !== id);
  if(items.length === origLen) return false;
  await writeAll(items);
  return true;
}

module.exports = { query, getById, create, update, remove };
