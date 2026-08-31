const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      totalAmount,
      discountSaved
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = new Order({
      user: req.user ? req.user._id : null,
      customerName,
      customerEmail,
      customerPhone,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      subtotal,
      deliveryFee: deliveryFee || 0,
      totalAmount,
      discountSaved: discountSaved || 0,
      orderStatus: 'Pending',
      trackingTimeline: [
        {
          status: 'Pending',
          time: new Date(),
          title: 'Order Placed',
          description: 'Your order has been received and confirmed by 24/7 Service.'
        }
      ]
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = orderStatus;

      let title = `Order ${orderStatus}`;
      let description = `Your order status has been updated to ${orderStatus}.`;

      if (orderStatus === 'Processing') {
        description = '24/7 Service store team is packing your fresh items.';
      } else if (orderStatus === 'Out for Delivery') {
        description = 'Our delivery partner is on the way to deliver your order.';
      } else if (orderStatus === 'Delivered') {
        description = 'Order successfully delivered to your doorstep!';
      } else if (orderStatus === 'Cancelled') {
        description = 'Order has been cancelled.';
      }

      order.trackingTimeline.push({
        status: orderStatus,
        time: new Date(),
        title,
        description
      });

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};
