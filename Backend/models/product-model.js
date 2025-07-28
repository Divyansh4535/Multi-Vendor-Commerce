const { default: mongoose, model } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: Buffer,
      },
    ],
    imageUrls: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    variants: [
      {
        size: String, // e.g. "M", "L", "XL"
        color: String, // e.g. "Red", "Black"
        stock: Number,
        image: String,
      },
    ],
    slug: {
      type: String,
      unique: true,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "out-of-delivery", "draft"],
    },
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
