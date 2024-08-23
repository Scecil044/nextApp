const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {type:String, required:[true, 'the email field is required!']},
    otp: {type: String, required: true},
    status: {type: String, default: "active"}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Otp = mongoose.model("Otp", OtpSchema)
module.exports = Otp