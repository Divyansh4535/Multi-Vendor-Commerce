const mongoose = require("mongoose");
const { ROLE, GENDER } = require("../config/constentArrays");

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
      min: 10,
      max: 12,
    },
    gender: {
      type: String,
      enum: GENDER,
      default: GENDER[0],
    },
    profileImage: {
      type: String,
      default: "/public/images/uploads/default.png",
    },
    cartsItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    ordersItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      enum: ROLE,
      default: ROLE[0],
    },
    address: {
      type: String,
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
      max: 12,
    },
    panNumber: {
      type: String,
      max: 10,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
