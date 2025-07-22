const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAuth",
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
    rating: {
    type: Number,
    min: 1,
    max: 5,
  },
},{
    timestamps:true,
    versionKey:false,
     strict:true
});

module.exports = mongoose.model("Comment", commentSchema);
