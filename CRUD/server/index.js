const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory store
let notes = [];
let nextId = 1;

// Create
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const note = { id: nextId++, title, content: content || '' };
  notes.push(note);
  res.status(201).json(note);
});

// Read all
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Read one
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: 'not found' });
  res.json(note);
});

// Update
app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: 'not found' });
  const { title, content } = req.body;
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;
  res.json(note);
});

// Delete
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = notes.length;
  notes = notes.filter(n => n.id !== id);
  if (notes.length === before) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`CRUD server listening on http://localhost:${PORT}`);
});
