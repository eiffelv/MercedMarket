var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Serving Home Page");
  res.render("index", { testmessage: "Express is Working!" });
});

/* GET /about */
router.get("/about", function (req, res, next) {
  res.render("about");
});

/* GET /cart */
router.get("/cart", function (req, res, next) {
  res.render("cart");
});

/* GET /login */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* GET /register */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/* GET /product */
router.get("/product", function (req, res, next) {
  res.render("product");
});

/* GET /payment */
router.get("/payment", function (req, res, next) {
  res.render("payment");
});

module.exports = router;
