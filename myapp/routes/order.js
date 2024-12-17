var express = require("express");
var router = express.Router();
const db = require('./db'); // adjust path if necessary
const { dbGet, dbAll, dbRun, checkToken } = require("./utils");

// Helper function to place order
async function placeOrder(user_id, product_ids) {
    // Retrieve selected cart items and their product info
    const placeholders = product_ids.map(() => '?').join(',');

    const cartItems = await dbAll(
        `SELECT ci.product_id, ci.quantity, p.price
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ? AND ci.product_id IN (${placeholders})`,
        [user_id, ...product_ids]
    );

    if (cartItems.length === 0) {
        throw new Error("No valid items found in cart.");
    }

    // Calculate total
    let total = 0;
    for (const item of cartItems) {
        total += item.price * item.quantity;
    }

    // Insert a new order
    const orderResult = await dbRun(
        `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
        [user_id, total]
    );
    const order_id = orderResult.lastID;

    // Insert order items
    for (const item of cartItems) {
        await dbRun(
            `INSERT INTO order_items (user_id, order_id, product_id, quantity)
       VALUES (?, ?, ?, ?)`,
            [user_id, order_id, item.product_id, item.quantity]
        );
    }

    // Remove these items from cart
    await dbRun(
        `DELETE FROM cart_items WHERE user_id = ? AND product_id IN (${placeholders})`,
        [user_id, ...product_ids]
    );

    return order_id;
}

/* GET /order/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
    res.send("/order OK");
});

/* POST /order/placeOrder */
router.post("/placeOrder", async function (req, res, next) {
    try {
        const token = req.cookies.token;
        const uid = parseInt(req.cookies.uid, 10);
        const { product_ids } = req.body;

        if (!uid || !token || !Array.isArray(product_ids) || product_ids.length === 0) {
            return res.status(400).json({ message: "Invalid request data." });
        }

        if (!await checkToken(uid, token)) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        const order_id = await placeOrder(uid, product_ids);
        res.status(200).json({ message: "Order placed successfully", order_id });
    } catch (err) {
        console.error("Error placing order:", err.message);
        res.status(500).json({ message: err.message });
    }
});

/* GET /order/getUserOrders */
router.get("/getUserOrders", async function (req, res, next) {
    try {
        const token = req.cookies.token;
        const uid = parseInt(req.cookies.uid, 10);

        if (!uid || !token) {
            return res.status(400).json({ message: "No user token provided." });
        }

        if (!await checkToken(uid, token)) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        // Get all orders for the user
        const orders = await dbAll(`SELECT * FROM orders WHERE user_id = ?`, [uid]);

        // Fetch order items for each order
        for (const order of orders) {
            const items = await dbAll(
                `SELECT oi.product_id, oi.quantity, p.name, p.price
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ? AND oi.user_id = ?`,
                [order.id, uid]
            );
            order.items = items;
        }

        res.status(200).json({ orders });
    } catch (err) {
        console.error("Error fetching user orders:", err.message);
        res.status(500).json({ message: err.message });
    }
});

/* POST /order/checkout */
router.get("/checkout", async function (req, res, next) {
    // Similar logic to placeOrder, you may use it interchangeably based on your frontend flow.
    try {
        const token = req.cookies.token;
        const uid = parseInt(req.cookies.uid, 10);
        const { product_ids } = req.query;

        if (!uid || !token || !Array.isArray(product_ids) || product_ids.length === 0) {
            return res.status(400).json({ message: "Invalid request data." });
        }

        if (!await checkToken(uid, token)) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        const order_id = await placeOrder(uid, product_ids);
        res.status(200).json({ message: "Checkout completed successfully", order_id });
    } catch (err) {
        console.error("Error during checkout:", err.message);
        res.status(500).json({ message: err.message });
    }
});

/* POST /order/cancelOrder */
router.post("/cancelOrder", async function (req, res, next) {
    try {
        const token = req.cookies.token;
        const uid = parseInt(req.cookies.uid, 10);
        const { order_id } = req.body;

        if (!uid || !token || !order_id) {
            return res.status(400).json({ message: "Invalid request data." });
        }

        if (!await checkToken(uid, token)) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        // Check if the order belongs to the user
        const order = await dbGet(`SELECT * FROM orders WHERE id = ? AND user_id = ?`, [order_id, uid]);
        if (!order) {
            return res.status(404).json({ message: "Order not found or not owned by user." });
        }

        // Delete order items and then the order
        await dbRun(`DELETE FROM order_items WHERE order_id = ? AND user_id = ?`, [order_id, uid]);
        await dbRun(`DELETE FROM orders WHERE id = ? AND user_id = ?`, [order_id, uid]);

        res.status(200).json({ message: "Order canceled successfully" });
    } catch (err) {
        console.error("Error canceling order:", err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
