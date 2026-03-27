const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();

const SECRET_KEY = "2002_adarsh"; // 

// --- REGISTER ---
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'buyer')`;
    
    db.run(sql, [name, email, hashedPassword], function(err) {
      if (err) return res.status(400).json({ error: "Email already exists" });
      res.status(201).json({ message: "User created! Please login." });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// --- LOGIN ---
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate Token (Expires in 1 hour)
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { name: user.name, role: user.role } });
  });
});

module.exports = { router, SECRET_KEY };
