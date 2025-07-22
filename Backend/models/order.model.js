const { default: mongoose, mongo } = require("mongoose");
const {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
} = require("../config/constentArrays");

const orderSchema = mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
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
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
