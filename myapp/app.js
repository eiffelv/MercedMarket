// Declare all the dependencies
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 3000;

// Import routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

// Create an express application
const app = express();

// Setup view engine
app.set("views", path.join(__dirname, "views"));

// Using EJS to simplify convertion from existing HTML to EJS
app.set("view engine", "ejs");

// Setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup directory to store static files (images, css, js)
app.use(express.static(path.join(__dirname, "public")));

// Setup routers
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
