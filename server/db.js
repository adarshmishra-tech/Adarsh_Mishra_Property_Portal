const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Using path.resolve for better WSL/Linux compatibility
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // 1. Users Table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'buyer'
  )`);

  // 2. Properties Table
  db.run(`CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT,
    price INTEGER,
    imageUrl TEXT
  )`);

  // 3. Favorites Table
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    property_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(property_id) REFERENCES properties(id)
  )`);

  // Seed with high-quality Unsplash images
  db.get("SELECT count(*) as count FROM properties", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO properties (address, price, imageUrl) VALUES (?, ?, ?)");
      
      // Modern Suburban House
      stmt.run(
        "123 Maple St, Springfield", 
        250000, 
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
      );

      // Luxury Modern Villa
      stmt.run(
        "456 Oak Ave, Metropolis", 
        450000, 
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
      );

      // Classic Brick Home
      stmt.run(
        "789 Pine Rd, Gotham", 
        320000, 
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
      );

      stmt.finalize();
      console.log("Database seeded with high-quality images.");
    }
  });
});

module.exports = db;