const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
