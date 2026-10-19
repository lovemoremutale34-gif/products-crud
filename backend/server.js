require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET all
app.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
app.get('/api/products/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
app.post('/api/products', (req, res) => {
  const { product_name, brand, category, price, stock, description } = req.body;
  if (!product_name || !brand || !category) {
    return res.status(400).json({ error: 'product_name, brand, category are required' });
  }
  try {
    const stmt = db.prepare(`INSERT INTO products (product_name, brand, category, price, stock, description)
                             VALUES (?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(product_name, brand, category, price ?? 0, stock ?? 0, description ?? '');
    const newRow = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newRow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
app.put('/api/products/:id', (req, res) => {
  const { product_name, brand, category, price, stock, description } = req.body;
  try {
    const stmt = db.prepare(`UPDATE products SET
                 product_name = COALESCE(?, product_name),
                 brand        = COALESCE(?, brand),
                 category     = COALESCE(?, category),
                 price        = COALESCE(?, price),
                 stock        = COALESCE(?, stock),
                 description  = COALESCE(?, description),
                 updated_at   = CURRENT_TIMESTAMP
               WHERE id = ?`);
    const info = stmt.run(product_name, brand, category, price, stock, description, req.params.id);
    
    if (info.changes === 0) return res.status(404).json({ error: 'Product not found' });
    const updatedRow = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(updatedRow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/products/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const info = stmt.run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', id: Number(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 API running at http://localhost:${PORT}`));