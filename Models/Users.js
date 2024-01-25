import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  address: String,
  city: String,
  state: String,
  phoneNumber: String,
  profilePhoto: String,
  // image: { data: Buffer, contentType: String },
});

const UsersModel = mongoose.model("Users", UsersSchema);
export default UsersModel;
