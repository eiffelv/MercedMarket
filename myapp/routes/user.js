var express = require("express");
var router = express.Router();

/* GET /user/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
  res.send("/user OK");
});

/* POST /user/login */
router.post("/login", function (req, res, next) {
  // login logic here
});

/* POST /user/register */
router.post("/register", function (req, res, next) {
  // register logic here
});

/* POST /user/logout */
router.post("/logout", function (req, res, next) {
  // logout logic here
});

/* PUT /user/updateSettings */
router.put("/updateSettings", function (req, res, next) {
  // update settings logic here
});

/* GET /user/getSettings */
router.get("/getSettings", function (req, res, next) {
  // get settings logic here
});

/* GET /user/getProfile */
router.get("/getProfile", function (req, res, next) {
  // get profile logic here
});

/* PUT /user/setProfile */
router.put("/setProfile", function (req, res, next) {
  // set profile logic here
});

/* POST /user/setupPayment */
router.post("/setupPayment", function (req, res, next) {
  // setup payment logic here
});

/* GET /user/getPayment */
router.get("/getPayment", function (req, res, next) {
  // get payment logic here
});

/* DELETE /user/destroyAccount */
router.delete("/destroyAccount", function (req, res, next) {
  // destroy account logic here
});

/* PUT /user/updatePassword */
router.put("/updatePassword", function (req, res, next) {
  // update password logic here
});

/* POST /user/resetPassword */
router.post("/resetPassword", function (req, res, next) {
  // reset password logic here
});

module.exports = router;
