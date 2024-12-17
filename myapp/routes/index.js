const express = require('express');
const router = express.Router();
const db = require('./db');
const title_postfix = " - Merced Market";
const {checkToken} = require("./utils");

/* GET home page. */
router.get("/", (req, res) => {
    db.all(`SELECT * FROM products`, [], (err, products) => {
        if (err) {
            return res.status(500).send('Error retrieving products');
        }
        res.render("index", { title: "Home" + title_postfix, products: products });
    });
});

/* GET /about */
router.get("/about", (req, res) => {
    res.render("about", { title: "About" + title_postfix });
});

/* GET /cart */
router.get("/cart", async (req, res) => {
    const token = req.cookies.token;
    const uid = req.cookies.uid;
    if (!await checkToken(uid, token)) {
        return res.redirect("/login");
    }
    db.all(`SELECT cart_items.id AS cart_item_id, 
                cart_items.user_id, 
                cart_items.product_id, 
                cart_items.quantity, 
                products.name, 
                products.price, 
                products.description
         FROM cart_items
         JOIN products ON cart_items.product_id = products.id
         WHERE cart_items.user_id = ?`,
        [uid], (err, items) => {
        if (err) {
            return res.redirect("/login");
        }
        console.log(items);
        if(!items)
            res.render("cart", { title: "Cart" + title_postfix, data: []});
        res.render("cart", { title: "Cart" + title_postfix, data: items});
    });
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
router.get("/product/:id", (req, res) => {
    const id = req.params.id;
    console.log("id:", id);
    db.get(`SELECT * FROM products where id = ?`, [id], (err, product) => {
        if (err) {
            return res.status(500).send('Error retrieving products');
        }
        if (!product) {
            console.log(product);
            return res.redirect("/notfound");
        }
        res.render("product", { title: "Product" + title_postfix, id: id, name: product.name, desc : product.description, price: product.price, stock: product.stock});
    });

});

/* GET /payment */
router.get("/payment", (req, res) => {
    res.render("payment", { title: "Payment" + title_postfix });
});

module.exports = router;
