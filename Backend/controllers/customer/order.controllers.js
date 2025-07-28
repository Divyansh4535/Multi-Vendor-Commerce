const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");
const User = require("../../models/user-model");

const listOfOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error("Get Orders Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const {
      orderType,
      paymentStatus,
      orderStatus,
      paymentMethod,
      shippingAddress,
    } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        status: false,
        msg: "user not found !",
      });
    }
    const cartProducts = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    const totalPrice = cartProducts?.products.map(
      (item) => item.product.price * item.quantity
    );
    const totalAmount = totalPrice.reduce((curr, next) => curr + next, 0);
    console.log("cartProducts------------------------>", totalPrice);

    const order = await Order.create({
      user: userId,
      products: cartProducts.products,
      totalAmount,
      orderType,
      paymentStatus,
      orderStatus,
      paymentMethod,
      shippingAddress,
      deliveryAddress: user.address,
    });

    return res.status(200).send({
      status: true,
      msg: "order place successfully.",
      data: {
        order,
      },
    });
  } catch (error) {
    console.error("Create Order Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const cancelOrder = async (req, res) => {
  try {
  } catch (error) {
    console.error("Cancel Order Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  listOfOrders,
  placeOrder,
  cancelOrder,
};
