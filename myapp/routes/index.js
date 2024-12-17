const express = require('express');
const router = express.Router();
const db = require('./db');
const title_postfix = " - Merced Market";

/* GET home page. */
router.get("/", (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, products) => {
    if (err) {
      return res.status(500).send('Error retrieving products');
    }
    res.render("index", { title: "Home" + title_postfix, testmessage: "Express is Working!", products: products });
  });
});

/* GET /about */
router.get("/about", (req, res) => {
  res.render("about", { title: "About" + title_postfix });
});

/* GET /cart */
router.get("/cart", (req, res) => {
  res.render("cart", { title: "Cart" + title_postfix });
});

/* GET /login */
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" + title_postfix });
});

/* GET /register */
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" + title_postfix });
});

/* GET /product */
router.get("/product", (req, res) => {
  res.render("product", { title: "Product" + title_postfix });
});

/* GET /payment */
router.get("/payment", (req, res) => {
  res.render("payment", { title: "Payment" + title_postfix });
});

module.exports = router;
