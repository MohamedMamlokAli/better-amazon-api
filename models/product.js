const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product Name is required.'],
      trim: true,
    },
    productDescription: {
      type: String,
      required: [true, 'Product Name is required.'],
      trim: true,
    },
    productManufacturerDetails: [{ key: String, value: String }],
    productKeyPoints: [{ type: String }],
    productDetails: {
      type: [{ key: String, value: String }],
    },
    productRating: {
      type: {
        stars: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isChoice: {
      type: Boolean,
      default: false,
    },
    productSeller: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    productPrice: {
      type: Number,
      required: [true, 'Price is required'],
    },
    productImage: {
      type: String,
      required: [true, 'Product main image is required'],
    },
    productSecondaryImages: {
      type: [String],
      required: false,
    },
    productDescriptionImages: {
      type: [String],
      required: false,
    },
    productCategory: {
      type: String,
      required: [true, 'Category is required'],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('product', productSchema);
