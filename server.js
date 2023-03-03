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
import { User } from "./user.js";
dotenv.config({
  path: "./data/config.env",
});

const app = express();

mongoose.connect(process.env.MONGO_URI);

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
app.use(passport.initialize());
app.use(passport.session());

import { Passport } from "./passportConfig.js";

//Routes
app.post("/login", (req, res) => {
  Passport.authenticate("local", (err, user, next) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });

  if (user)
    return res.status(500).json({
      success: false,
      message: "User Already Exist",
    });

  user = await User.create({
    username,
    password,
  });
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

//Start server
app.listen(process.env.PORT, () => {
  `Server up at ${process.env.PORT}`;
});
