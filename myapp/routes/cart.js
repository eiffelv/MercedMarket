var express = require("express");
const cookieParser = require('cookie-parser');
var router = express.Router();
const db = require('./db');
const { checkToken } = require("./utils");
const title_postfix = " - Merced Market";

/* GET /cart/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
    res.render("cart", { title: "Cart" + title_postfix });
});

/* GET /cart/clearCart */
router.get("/clearCart", async function (req, res, next) {
    // clear cart logic here
    const token = req.cookies.token;
    const uid = req.cookies.uid;
    if (!await checkToken(uid, token)) {
        res.status(403).json({ message: "Invalid Token" });
    }
    db.run(
        "Delete from cart_items where user_id = ?",
        [uid],
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Failed" });
            }
            res.status(200).json({ message: "Clearance Succeeded" });
        }
    );
});

router.get("/getCart", async function (req, res, next) {
    const token = req.cookies.token;
    const uid = req.cookies.uid;

    // Check the token
    if (!await checkToken(uid, token)) {
        return res.status(403).json({ message: "Invalid Token" });
    }

    // Query to join cart_items and products table
    db.all(
        `SELECT cart_items.id AS cart_item_id, 
                cart_items.user_id, 
                cart_items.product_id, 
                cart_items.quantity, 
                products.name, 
                products.price, 
                products.description
         FROM cart_items
         JOIN products ON cart_items.product_id = products.id
         WHERE cart_items.user_id = ?`,
        [uid],
        (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Database error" });
            }
            res.json(rows); // Return the resulting rows as JSON
        }
    );
});


/* get /cart/addCartItem */
router.get("/addCartItem", async function (req, res, next) {
    const { product, quantity } = req.query;
    const token = req.cookies.token;
    const uid = req.cookies.uid;
    if (!await checkToken(uid, token)) {
        res.status(403).json({ message: "Invalid Token" });
    }
    db.get("SELECT * FROM products", async (err, products) => {
        console.log(products);
    });
    db.get(
        "SELECT * FROM products WHERE id = ?",
        [product],
        async (err, Item) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!Item) return res.status(401).json({ error: "Item not found" });
            db.run(
                "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [uid, product, quantity],
                function (err) {
                    if (err) {
                        if (err.message.includes("UNIQUE constraint failed")) {
                            return res.status(409).json({ error: "Failed" });
                        }
                        console.log(err);
                        return res.status(500).json({ error: "Failed" });
                    }
                    res.status(200).json({ message: "Insertation Succeeded" });
                }
            );
        }
    );


});

/* GET /cart/deleteCartItem */
router.get("/deleteCartItem", async function (req, res, next) {
    const { product } = req.query; // Get product ID from query
    const token = req.cookies.token;
    const uid = req.cookies.uid;

    // Validate token
    if (!await checkToken(uid, token)) {
        return res.status(403).json({ message: "Invalid Token" });
    }

    // Validate input
    if (!product) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if the item exists in the user's cart
    db.get(
        "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
        [uid, product],
        (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Database error" });
            }
            if (!row) {
                return res.status(404).json({ message: "Item not found in cart" });
            }

            // Delete the item from the cart
            db.run(
                "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
                [uid, product],
                function (deleteErr) {
                    if (deleteErr) {
                        console.error(deleteErr.message);
                        return res.status(500).json({ message: "Failed to delete item" });
                    }
                    res.status(200).json({ message: "Item deleted successfully" });
                }
            );
        }
    );
});


/* GET /cart/updateCartItem */
router.get("/updateCartItem", async function (req, res, next) {
    const { product, quantity } = req.query; // Get product ID and new quantity from query
    const token = req.cookies.token;
    const uid = req.cookies.uid;

    // Validate token
    if (!await checkToken(uid, token)) {
        return res.status(403).json({ message: "Invalid Token" });
    }

    // Validate input
    if (!product || !quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if the item exists in the user's cart
    db.get(
        "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
        [uid, product],
        (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Database error" });
            }
            if (!row) {
                return res.status(404).json({ message: "Item not found in cart" });
            }

            // Update the item's quantity
            db.run(
                "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
                [quantity, uid, product],
                function (updateErr) {
                    if (updateErr) {
                        console.error(updateErr.message);
                        return res.status(500).json({ message: "Failed to update quantity" });
                    }
                    res.status(200).json({ message: "Quantity updated successfully" });
                }
            );
        }
    );
});
module.exports = router;
