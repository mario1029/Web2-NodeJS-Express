const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  producto: {
    type: String,
    require:true
  },
  cantidad: {
    type: String,
    require:true
  },
  precio: {
  	type: Number,
  	require:true
  },
  fecha: {
  	type: Date,
  	default: Date.now
  },
  usuario: {
    type: String
  }
})


const product = mongoose.model('product', productSchema);

module.exports = product;
