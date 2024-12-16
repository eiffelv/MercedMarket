var express = require("express");
var router = express.Router();
const db = require('../public/db');

/* GET /cart/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
  res.send("/cart OK");
});

/* DELETE /cart/clearCart */
router.delete("/clearCart", function (req, res, next) {
  // clear cart logic here
});

/* POST /cart/addCartItem */
router.post("/addCartItem", function (req, res, next) {
  const { product_id, quantity, price } = req.body;
  const query = 'INSERT INTO cart_items (product_id, quantity, price) VALUES (?, ?, ?)';
  const params = [product_id, quantity, price];

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

/* DELETE /cart/deleteCartItem */
router.delete("/deleteCartItem", function (req, res, next) {
  // delete cart item logic here
});

/* PUT /cart/updateCartItem */
router.put("/updateCartItem", function (req, res, next) {
  // update cart item logic here
});

module.exports = router;
