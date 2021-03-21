const mongoose = require("mongoose");
const {Schema,  model} = require("mongoose")

const AppSchema = Schema({
  name: {
    type: String,
    required: [true, "el nombre de la app es obligatorio"],
  },
  desc: {
    type: String,
    required: [true, "la descripción del proyecto es obligatoria"],
  },
  link: {
    type: String,
    required: [true, "el link del proyecto es obligatorio"],
  },
  isActive:{type:Boolean, default:true},
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  img: { type: String }
  
});

AppSchema.methods.toJSON = function (){
  const { __v, _id, ...app} = this.toObject()
  app.id = _id
  return app
}
module.exports = model("App",AppSchema)
