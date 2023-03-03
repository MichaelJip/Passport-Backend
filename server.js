import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import expressSession from "express-session";
import bodyParser from "body-parser";

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

app.post("/get", (req, res) => {});

//Start server
app.listen(process.env.PORT, () => {
  `Server up at ${process.env.PORT}`;
});
