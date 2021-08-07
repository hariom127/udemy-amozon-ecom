const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");

// ------express.json() use same as body-parser-------
app.use(express.json());

app.use(cookieParser());

// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
// -set pripix in product route
app.use("/api/v1", products);
app.use("/api/v1", auth);

// middleware to heandel error----
app.use(errorMiddleware);

module.exports = app;
