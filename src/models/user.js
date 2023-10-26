import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "username has to be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email has to be unique"],
  },
  password: {
    type: String,
    required: [true, "Email is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verfiyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExpiry: {
    type: Date,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
