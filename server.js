const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const expressSession = require("express-session");
const bodyParser = require("body-parser");

dotenv.config({
  path: "./data/config.env",
});

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(
  expressSession({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
//Routes
app.post("/login", (req, res) => {
  console.log(req.body);
});

app.post("/register", (req, res) => {
  console.log(req.body);
});

app.get("/get", (req, res) => {});

app.use("/", (req, res) => {
  res.send("Working");
});

//Start server
app.listen(process.env.PORT, () => {
  `Server up at ${process.env.PORT} asdasdas`;
});
