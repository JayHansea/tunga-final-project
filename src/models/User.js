const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the User schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Author", "Reader"],
    default: "Reader",
  },
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
