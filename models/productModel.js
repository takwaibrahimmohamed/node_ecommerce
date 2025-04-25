const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "product title is required"],
    unique: [true, "product title must be unique"],
    minlength: [3, "too short product title"],
    maxlength: [100, "too long product title"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "product description is required"],
    minlength: [10, "too short product description"],
  },
  price: {
    type: Number,
    required: [true, "product price is required"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "product must belong to a category"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "product must belong to a seller"],
  },
},{ timestamps: true })

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;