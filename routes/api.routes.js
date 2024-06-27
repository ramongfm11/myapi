const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Get all items
router.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Add a new item
router.post('/items', (req, res) => {
    const newItem = req.body;
    db.query('INSERT INTO items SET ?', newItem, (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId, ...newItem });
    });
});

// Get a single item by id
router.get('/items/:id', (req, res) => {
    db.query('SELECT * FROM items WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// Update an item
router.put('/items/:id', (req, res) => {
    const updatedItem = req.body;
    db.query('UPDATE items SET ? WHERE id = ?', [updatedItem, req.params.id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Item updated successfully' });
    });
});

// Delete an item
router.delete('/items/:id', (req, res) => {
    db.query('DELETE FROM items WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Item deleted successfully' });
    });
});

module.exports = router;