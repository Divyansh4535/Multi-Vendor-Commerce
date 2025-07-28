const Cart = require("../../models/cart.model");
const User = require("../../models/user-model");

const getAllCarts = async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!carts) {
      return res.status(404).send({
        status: false,
        msg: "Cart not Found!",
      });
    }

    console.log("carts=========>", carts);
    // const totalAmount = carts.products.map((elem) => {
    //   return (
    //     elem?.product?.price -
    //     ((elem?.product?.price * elem.product.discount) / 100) * elem.quantity
    //   );
    // });
    const totalAmount = carts.products.map((elem) => {
      let price = elem?.product?.price;
      let quantity = elem?.quantity;
      return price * quantity;
    });
    const subTotal = totalAmount.reduce((crr, next) => crr + next, 0);
    console.log("totalAmount", totalAmount);
    console.log("totalAmount", subTotal);

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
    const { product, quantity } = req.body;
    const userId = req?.user?.id;
    let cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    // console.log("cart-->", cart);
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
      const productIndex = cart.products.findIndex((item) => {
        // console.log("item.product", item.product);
        // console.log("item.product?._id", item.product?._id);
        // console.log(
        //   "item.product?._id.toString()",
        //   item.product?._id?.toString()
        // );
        // console.log("product", product);

        return item.product?._id?.toString() === product;
      });

      // console.log("productIndex", productIndex);
      // console.log("cart.products[productIndex].quantity ", cart.products);
      if (productIndex > -1) {
        const newQuantity = cart.products[productIndex].quantity + quantity;
        // console.log("newQuantity", newQuantity);
        // console.log("Quantity", quantity);
        if (newQuantity < 1) {
          // cart.products = cart.products.filter((item) => item.quantity < 1);
          cart.products.splice(productIndex, 1);
        } else {
          cart.products[productIndex].quantity = newQuantity;
        }
      } else {
        if (quantity > 0) {
          cart.products.push({ product, quantity });
        }
      }

      await cart.save();
    }

    res.status(201).send({
      status: true,
      msg: "Cart updated successfully !",
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

// const removeCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, cartId } = req.body;

//     console.log("cartId", cartId);
//     console.log("productId", productId);
//     const cart = await Cart.findOneAndUpdate(
//       { user: userId },
//       { $pull: { products: { _id: productId } } },
//       { new: true }
//     );

//     console.log("cart", cart);
//     if (!cart) {
//       return res.status(404).send({
//         status: false,
//         msg: "Cart Not Found!",
//       });
//     }
//     res.status(200).send({
//       status: true,
//       msg: "Remove product to your cart",
//       data: cart,
//     });
//   } catch (error) {
//     console.error("Remove Cart Error:", error.message);
//     return res.status(500).send({
//       status: false,
//       msg: "Server error",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  getAllCarts,
  addToCart,
};
