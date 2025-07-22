const Category = require("../../models/category");
const { generateSlug } = require("../../utils/slug");

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    const totalCategory = await Category.countDocuments();
    if (!category) {
      return res.status(404).send({
        status: false,
        msg: "category not found!",
      });
    }
    res.status(200).send({
      status: true,
      msg: "category fetched successfully!",
      data: { category, total: totalCategory },
    });
  } catch (error) {
    console.error("fetched all Category Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name, isActive, icon } = req.body;
    if (!name) {
      return res.status(400).send({
        status: false,
        msg: "name is required !",
      });
    }
    const slug = generateSlug(name);
    const newCategory = await Category.create({ name, slug, isActive });
    return res.status(201).send({
      status: true,
      msg: "category create successfully!",
      data: newCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, isActive } = req.body;
    const slug = generateSlug(name);
    const editCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, isActive, slug },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "category updated!",
      data: editCategory,
    });
  } catch (error) {
    console.error("Update category Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    return res.status(200).send({
      status: true,
      msg: "category deleted!",
    });
  } catch (error) {
    console.error("Delete Category Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
