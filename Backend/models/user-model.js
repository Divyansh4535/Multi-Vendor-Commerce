const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 12,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profileImage: {
      type: String,
      default: "/public/images/uploads/default.png",
    },
    cartsItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    ordersItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "customer", "vendor"],
      default: "customer",
    },

    // =========== vendor extra fields ==========
    shopName: {
      type: String,
      sparse: true,
    },
    shopAddress: {
      type: String,
      default: "",
    },
    gstNumber: {
      type: String,
      default: "",
    },
    pinCode: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    adharNumber: {
      type: String,
      maxlength: 12,
    },
    panNumber: {
      type: String,
      maxlength: 10,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
