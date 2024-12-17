const express = require('express');
const router = express.Router();
const db = require('./db');

// Route to get products and render HTML
router.get('/', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(rows);
    });
});

module.exports = router;