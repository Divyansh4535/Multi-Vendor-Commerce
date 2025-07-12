const Product = require("../../models/product-model");
const User = require("../../models/user-model");
const { generateSlug } = require("../../utils/slug");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrls,
      price,
      discount,
      variants,
      stock,
      category,
    } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !discount ||
      !variants ||
      !stock ||
      !category
    ) {
      return res.status(400).send({
        status: false,
        msg: "All fields are required!",
      });
    }

    const vendor = await User.findById(req.user.id);
    console.log("vendor", vendor);
    const slug = generateSlug(title);
    const newProduct = await Product.create({
      title,
      description,
      price,
      imageUrls,
      discount,
      variants,
      stock,
      category,
      slug,
      vendor: vendor.id,
    });
    return res.status(201).send({
      status: true,
      msg: "product create successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const {
      title,
      description,
      imageUrls,
      price,
      discount,
      variants,
      stock,
      category,
    } = req.body;
    // find vendor
    const vendor = await User.findById(req.user.id);
    if (!vendor) {
      return res.status(404).send({
        status: false,
        msg: "vendor not fount!",
      });
    }
    // find product by id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ status: false, msg: "Product Not Found!" });
    }
    console.log("product", product);
    console.log(
      "product.vendor !== req.user.id",
      product.vendor.toString(),
      req.user.id
    );

    // check if product is belong by this vendor
    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).send({
        status: false,
        msg: "You are not allowed to update this product",
      });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        imageUrls,
        price,
        discount,
        variants,
        stock,
        category,
      },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "product Update successfully!",
      data: updateProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const listProduct = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const products = await Product.find({ vendor: vendorId });
    const totalProductCount = await Product.countDocuments({
      vendor: vendorId,
    });
    return res.status(200).send({
      status: true,
      msg: "all vendor products!",
      data: { products, totalProduct: totalProductCount },
    });
  } catch (error) {
    console.error("List Product Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        status: false,
        msg: "Product not found",
      });
    }

    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).send({
        status: false,
        msg: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).send({
      status: true,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  listProduct,
};
