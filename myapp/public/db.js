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
        email TEXT NOT NULL UNIQUE,
        cart INTEGER DEFAULT 0
      )`, (err) => {
        if (err) {
          console.error('Error creating user profile', err.message);
        } else {
          console.log('User profile created successfully!');
        }
      });

      //create a table for store items
      db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL
      )`, (err) => {  
      if (err) {
        console.error('Error creating products table', err.message);
      } else {
        console.log('Products table created successfully!');

        //insert store products
        const products = [
          {name: 'SFSU ornament', description: 'Purple ornament with school logo in the center', price: 19.95},
          {name: 'SFSU thermas', description: 'Stainless stell thermas with SFSU logo printed on leather', price: 29.99 },
          {name: 'SFSU pennant', description: 'Purple and yellow SFSU pennant flag', price: 39.99},
          {name: 'SFSU mug', description: 'White mug with notable San Francisco, California icons ', price: 49.99},
          {name: 'SFSU gator', description: 'Stuffed alligator wearing SFSU bandana', price: 59.99},
          {name: 'SFSU tall cup', description: 'Silver cup printed with purple and yellow snowflakes and SFSU logo printed handle', price: 69.99}
        ];

        products.forEach(product => {
          db.run(`INSERT OR IGNORE INTO products (name, description, price) VALUES (?, ?, ?)`, 
              [product.name, product.description, product.price, product.stock], 
              (err) => {
                  if (err) {
                      console.error('Error inserting product', err.message);
                  } else {
                      console.log(`Product '${product.name}' inserted successfully!`);
                  }
              });
          });
        }
      });
    }
});
  
  module.exports = db;

