const Cart = require("../../models/cart.model");
const User = require("../../models/user-model");

const getAllCarts = async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    console.log("carts", carts);
    // const totalAmount = carts.products.map((elem) => {
    //   return (
    //     elem?.product?.price -
    //     ((elem?.product?.price * elem.product.discount) / 100) * elem.quantity
    //   );
    // });
    const totalAmount = carts.products.map((elem) => {
      return elem?.product?.price * elem.quantity;
    });
    const subTotal = totalAmount.reduce((crr, next) => crr + next, 0);
    console.log("totalAmount", totalAmount);
    console.log("totalAmount", subTotal);

    if (!carts) {
      return res.status(404).send({
        status: false,
        msg: "Cart not Found!",
      });
    }

    res.send({
      status: true,
      msg: "fetched all products",
      data: {
        carts,
        subTotal,
        totalCart: carts.products.length,
      },
    });
  } catch (error) {
    console.error("Get all carts Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req?.user?.id;
    const { product, quantity = 1 } = products[0];
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        products: [
          {
            product,
            quantity,
          },
        ],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.product?.toString() === product
      );
      console.log("productIndex", productIndex);

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product, quantity });
      }
      await cart.save();
    }

    res.status(201).send({
      status: true,
      msg: "Product added to cart successfully!",
      data: cart,
    });
  } catch (error) {
    console.error("Add to cart Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const removeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, cartId } = req.body;

    console.log("cartId", cartId);
    console.log("productId", productId);
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { _id: cartId } } },
      { new: true }
    );

    console.log("cart", cart);
    if (!cart) {
      return res.status(404).send({
        status: false,
        msg: "Cart Not Found!",
      });
    }
    res.status(200).send({
      status: true,
      msg: "Remove product to your cart",
      data: cart,
    });
  } catch (error) {
    console.error("Remove Cart Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCarts,
  addToCart,
  removeCart,
};
