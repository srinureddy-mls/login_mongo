const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Product_Name: {
    type: String,
    required: true
  },
  Product_cost: {
    type: Number,
    required: true
  },
  Person_age: {
    type: Number,
    required: true
  },
  Order_date: {
    type: Date,
    required: true
  },
  Product_image: {
    type: String,
    required: true
  }
},{ collection: 'number' }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
