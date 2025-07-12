const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    showOnHome: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
      default: 0, // 0 = main, 1 = subcategory, etc.
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
