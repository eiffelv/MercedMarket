var express = require("express");
var router = express.Router();
const db = require('./db');
const title_postfix = " - Merced Market";

/* GET /cart/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
  res.render("cart", { title: "Cart" + title_postfix });
});

/* DELETE /cart/clearCart */
router.delete("/clearCart", function (req, res, next) {
  // clear cart logic here
});

/* POST /cart/addCartItem */
router.post("/addCartItem", function (req, res, next) {
  // post car logic here
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
