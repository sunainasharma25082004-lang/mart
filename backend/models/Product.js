const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  unit: { type: String, default: '1 pc' },
  image: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 50 },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 124 },
  isDealOfDay: { type: Boolean, default: false },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
