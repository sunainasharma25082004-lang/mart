const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { category, search, deal } = req.query;
    let query = {};

    if (category && category !== 'All Categories') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (deal === 'true') {
      query.isDealOfDay = true;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price, originalPrice, unit, image, description, isDealOfDay, stockCount } = req.body;
    
    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const product = new Product({
      name,
      slug,
      category,
      price,
      originalPrice,
      discountPercent: discountPercent > 0 ? discountPercent : 0,
      unit: unit || '1 pc',
      image,
      stockCount: stockCount || 50,
      description: description || '',
      isDealOfDay: isDealOfDay || false
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.category = req.body.category || product.category;
      product.price = req.body.price !== undefined ? req.body.price : product.price;
      product.originalPrice = req.body.originalPrice !== undefined ? req.body.originalPrice : product.originalPrice;
      if (req.body.price && req.body.originalPrice) {
        product.discountPercent = Math.round(((req.body.originalPrice - req.body.price) / req.body.originalPrice) * 100);
      }
      product.unit = req.body.unit || product.unit;
      product.image = req.body.image || product.image;
      product.inStock = req.body.inStock !== undefined ? req.body.inStock : product.inStock;
      product.stockCount = req.body.stockCount !== undefined ? req.body.stockCount : product.stockCount;
      product.isDealOfDay = req.body.isDealOfDay !== undefined ? req.body.isDealOfDay : product.isDealOfDay;
      product.description = req.body.description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
