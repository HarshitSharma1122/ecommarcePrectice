const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAuth",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    timestamps:true,
    versionKey:false,
    statics:true
});

module.exports = mongoose.model("Order", orderSchema);
