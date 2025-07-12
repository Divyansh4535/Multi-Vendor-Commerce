const Product = require("../../models/product-model");

const productListA = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor");
    const totalProducts = await Product.countDocuments();
    return res.status(200).send({
      status: true,
      msg: "all products",
      data: {
        products,
        totalProducts,
      },
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
const productDetailsA = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("vendor");
    return res.status(200).send({
      status: true,
      msg: "fetched Product details",
      data: product,
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

const productEditA = async (req, res) => {
  try {
    const { productId } = req.params;
    const { isActive } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { isActive },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, msg: "Product is activated !", data: product });
  } catch (error) {
    console.error("Product isActive by Admin Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const productDeleteA = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    return res.status(200).send({
      status: true,
      msg: "Admin delete product!",
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
  productListA,
  productDetailsA,
  productDeleteA,
  productEditA,
};
