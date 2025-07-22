// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
}, { 
    timestamps: true ,
    versionKey:false,
    strict:true
});

module.exports = mongoose.model('Category', categorySchema);
