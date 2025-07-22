const express = require("express");
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
const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/admin/categorys");
const router = express.Router();

router.post("/login", adminLogin);
//<=================================== Products Routes ====================>
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

//<=================================== Category Routes ====================>

router.get(
  "/get-category",
  isAuthenticated,
  authorizeRoles("admin"),
  getCategory
);
router.post(
  "/create-category",
  isAuthenticated,
  authorizeRoles("admin"),
  createCategory
);
router.patch(
  "/update-category/:categoryId",
  isAuthenticated,
  authorizeRoles("admin"),
  updateCategory
);
router.delete(
  "/delete-category/:categoryId",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCategory
);

module.exports = {
  adminRouter: router,
};
