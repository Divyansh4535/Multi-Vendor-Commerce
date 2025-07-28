const { default: mongoose, mongo } = require("mongoose");
const {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
  ORDER_TYPE,
} = require("../config/constentArrays");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderType: {
      type: String,
      enum: ORDER_TYPE,
      default: ORDER_TYPE[0],
    },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS,
      default: PAYMENT_STATUS[0],
    },
    orderStatus: {
      type: String,
      enum: ORDER_STATUS,
      default: ORDER_STATUS[0],
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHOD,
      default: PAYMENT_METHOD[0],
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
