const express = require('express');
const db = require('./db');
const authenticateToken = require('./middleware/authMiddleware');
const router = express.Router();

// 1. GET ALL PROPERTIES
// This shows the general list to the user
router.get('/', (req, res) => {
  db.all("SELECT * FROM properties", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Could not fetch properties" });
    res.json(rows);
  });
});

// 2. GET USER FAVOURITES (Protected)
// Shows only the properties liked by the logged-in user
router.get('/favourites', authenticateToken, (req, res) => {
  const sql = `
    SELECT p.* FROM properties p
    JOIN favorites f ON p.id = f.property_id
    WHERE f.user_id = ?`;
  
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Could not fetch favourites" });
    res.json(rows);
  });
});

// 3. TOGGLE FAVOURITE (Protected)
// Adds or removes a property from the user's list
router.post('/favourites/:id', authenticateToken, (req, res) => {
  const propertyId = req.params.id;
  const userId = req.user.id;

  // Check if it's already a favourite
  db.get("SELECT * FROM favorites WHERE user_id = ? AND property_id = ?", [userId, propertyId], (err, row) => {
    if (row) {
      // If it exists, remove it (Unlike)
      db.run("DELETE FROM favorites WHERE user_id = ? AND property_id = ?", [userId, propertyId], (err) => {
        if (err) return res.status(500).json({ error: "Error removing favourite" });
        res.json({ message: "Removed from favourites", isFavourite: false });
      });
    } else {
      // If it doesn't exist, add it (Like)
      db.run("INSERT INTO favorites (user_id, property_id) VALUES (?, ?)", [userId, propertyId], (err) => {
        if (err) return res.status(500).json({ error: "Error adding favourite" });
        res.json({ message: "Added to favourites", isFavourite: true });
      });
    }
  });
});

module.exports = router;
