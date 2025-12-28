const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },

  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ancestorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  balance: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
