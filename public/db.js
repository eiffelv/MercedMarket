const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to user database.');
  
      // Create a table for user profiles
      db.run(`CREATE TABLE IF NOT EXISTS user_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )`, (err) => {
        if (err) {
          console.error('Error creating user_profiles table:', err.message);
        } else {
          console.log('user_profiles table created successfully.');
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_profiles(id)
      )`, (err) => {
        if (err) {
          console.error('Error creating cart_items table:', err.message);
        } else {
          console.log('cart_items table created successfully.');
        }
      });
    }
  });
  
  module.exports = db;

