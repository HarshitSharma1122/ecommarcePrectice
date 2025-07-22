// controllers/order.controller.js
const Product = require("../models/product.schema");
const Order = require("../models/order.schema");

const checkout = async (req, res) => {
  const userId = req.user_details._id;
  const cartItems = req.body;  // taking productid and quantity

  try {
    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ success: false, msg: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          msg: `Insufficient stock for ${product.title}. Only ${product.stock} left`
        });
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount: total
    });

    await newOrder.save();

    res.status(201).json({ success: true, msg: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports={checkout}