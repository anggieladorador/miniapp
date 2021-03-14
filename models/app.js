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
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

AppSchema.methods.toJSON = function (){
  const { __v, _id, user, ...app} = this.toObject()
  return app
}
module.exports = model("App",AppSchema)
