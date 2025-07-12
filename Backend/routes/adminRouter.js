const express = require("express");
const User = require("../models/user-model");
const { adminLogin } = require("../controllers/admin/logincontroller");
const {
  productListA,
  productDetailsA,
  productDeleteA,
  productEditA,
} = require("../controllers/admin/products");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/isAuthentication");
const router = express.Router();

router.post("/login", adminLogin);

// product routes ---------------->
router.get(
  "/get-products",
  isAuthenticated,
  authorizeRoles("admin"),
  productListA
);
router.get(
  "/product-details/:productId",
  isAuthenticated,
  authorizeRoles("admin"),
  productDetailsA
);
router.patch(
  "/product-edit/:productId",
  isAuthenticated,
  authorizeRoles("admin"),
  productEditA
);
router.delete(
  "/product-delete/:productId",
  isAuthenticated,
  authorizeRoles("admin"),
  productDeleteA
);

module.exports = {
  adminRouter: router,
};
