var express = require("express");
var router = express.Router();

/* GET /order/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
  res.send("/order OK");
});

/* POST /order/createOrder */
router.post("/createOrder", function (req, res, next) {
  // create order logic here
});

/* GET /order/getUserOrders */
router.get("/getUserOrders", function (req, res, next) {
  // get user orders logic here
});

/* POST /order/checkout */
router.post("/checkout", function (req, res, next) {
  // checkout logic here
});

/* POST /order/cancelOrder */
router.post("/cancelOrder", function (req, res, next) {
  // cancel order logic here
});

module.exports = router;
