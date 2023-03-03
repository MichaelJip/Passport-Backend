import mongoose from "mongoose";

export const user = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("User", user);
