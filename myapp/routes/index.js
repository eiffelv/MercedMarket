const express = require("express");
const router = express.Router();
const title_postfix = " - Merced Market";

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Serving Home Page");
  res.render("index", { title: "Home" + title_postfix, testmessage: "Express is Working!" });
});

/* GET /about */
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About" + title_postfix });
});

/* GET /cart */
router.get("/cart", function (req, res, next) {
  res.render("cart", { title: "Cart" + title_postfix });
});

/* GET /login */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" + title_postfix });
});

/* GET /register */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" + title_postfix });
});

/* GET /product */
router.get("/product", function (req, res, next) {
  res.render("product", { title: "Product" + title_postfix });
});

/* GET /payment */
router.get("/payment", function (req, res, next) {
  res.render("payment", { title: "Payment" + title_postfix });
});

module.exports = router;
