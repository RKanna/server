// const mongoose = require("mongoose");
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const UsersModel = mongoose.model("Users", UsersSchema);
// module.exports = UsersModel;
export default UsersModel;
