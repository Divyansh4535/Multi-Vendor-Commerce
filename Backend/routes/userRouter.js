const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
} = require("../controllers/customer/authcontroller");
const {
  getAllProducts,
  productDetails,
} = require("../controllers/customer/products");
const { isAuthenticated } = require("../middlewares/isAuthentication");
const {
  addToCart,
  getAllCarts,
} = require("../controllers/customer/cart.controllers");
const {
  cancelOrder,
  listOfOrders,
  placeOrder,
} = require("../controllers/customer/order.controllers");

// Auth routes ------------------------------------------->
router.post("/register", registerUser);
router.post("/login", loginUser);

// Products Routes --------------------------------------->
router.get("/products", getAllProducts);
router.get("/product-details/:productId", productDetails);

// Cart Routes ------------------------------------------->
router.get("/get-all-carts", isAuthenticated, getAllCarts);
router.post("/add-to-cart", isAuthenticated, addToCart);
// router.delete("/remove-cart", isAuthenticated, removeCart);

// Order Routes ------------------------------------------->
router.get("/get-all-orders", isAuthenticated, listOfOrders);
router.post("/create-order", isAuthenticated, placeOrder);
router.post("/cancel-order", isAuthenticated, cancelOrder);

module.exports = {
  userRouter: router,
};
