const express = require("express");
const {
  registerVendor,
  loginVendor,
} = require("../controllers/vendor/authcontroller");
const {
  createProduct,
  updateProduct,
  listProduct,
  deleteProduct,
  productDetails,
} = require("../controllers/vendor/product");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/isAuthentication");
const router = express.Router();

router.post("/register", registerVendor);
router.post("/login", loginVendor);

// <========================= Products routes ===============================>
router.post(
  "/create-product",
  isAuthenticated,
  authorizeRoles("vendor"),
  createProduct
);
router.get(
  "/get-products",
  isAuthenticated,
  authorizeRoles("vendor"),
  listProduct
);
router.get(
  "/product-details/:productId",
  isAuthenticated,
  authorizeRoles("vendor"),
  productDetails
);
router.delete(
  "/delete-product:productId",
  isAuthenticated,
  authorizeRoles("vendor"),
  deleteProduct
);
router.patch(
  "/update-product/:productId",
  isAuthenticated,
  authorizeRoles("vendor"),
  updateProduct
);

module.exports = {
  vendorRouter: router,
};
