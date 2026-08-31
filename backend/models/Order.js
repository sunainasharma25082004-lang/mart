const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, default: '' },
      image: { type: String, required: true }
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, default: 'Chandigarh' },
    pincode: { type: String, default: '160022' }
  },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  discountSaved: { type: Number, default: 0 },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  trackingTimeline: [
    {
      status: { type: String },
      time: { type: Date, default: Date.now },
      title: { type: String },
      description: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
