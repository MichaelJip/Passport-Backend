import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user = new mongoose.Schema({
  username: String,
  password: String,
});

user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", user);
