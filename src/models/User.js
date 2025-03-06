const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Author", "Reader"],
    default: "Reader",
  },
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
