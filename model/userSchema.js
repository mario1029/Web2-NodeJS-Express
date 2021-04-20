const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require:true
  },
  correo: {
    type: String,
    require:true,
    unique: true
  },
  telefono: {
  	type: String,
  },
  clave: {
  	type: String,
  	require:true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.encryptPass =async (pass)=>{
  const salt = await bcrypt.genSalt(5);
  const passEncryp = bcrypt.hash(pass,salt);
  return passEncryp;
}

userSchema.methods.comparar =async function (pass){
  const match = await bcrypt.compare(pass, this.clave);
  return match;
}

const usuario = mongoose.model('usuario', userSchema);

module.exports = usuario;
