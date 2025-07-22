const Product = require("../../models/product-model");

const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find({ isActive: true }).populate("vendor");
    const products = await Product.find().populate("vendor"); // checking only
    // console.log("products------------>", products);
    const totalProducts = await Product.countDocuments({ isActive: true });
    return res.status(200).send({
      status: true,
      msg: "All available products",
      data: {
        products,
        total: totalProducts,
      },
    });
  } catch (error) {
    console.error("Product List Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    return res.status(200).send({
      status: true,
      msg: "Product Details",
      data: product,
    });
  } catch (error) {
    console.error("Single Product Error :", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getAllProducts, productDetails };
