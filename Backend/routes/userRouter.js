const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
} = require("../controllers/customer/authcontroller");
const {
  getAllProducts,
  singleProduct,
  productDetails,
} = require("../controllers/customer/products");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/isAuthentication");

// Auth routes ------>
router.post("/register", registerUser);
router.post("/login", loginUser);

// Products Routes --------->
router.get("/products", getAllProducts);
router.get("/product-details/:productId", productDetails);

module.exports = {
  userRouter: router,
};
