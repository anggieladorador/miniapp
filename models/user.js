const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, required: [true, "el nombre es obligatorio"] },
  email: { type: String, unique: true },
  pass: { type: String, required: [true, "la contraseña es obligatoria"] },
  img: { type: String },
  role: { type: String, required: true, emun: ["ADMIN_ROLE", "USER_ROLE"], default:"USER_ROLE"},
  isActive: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
  nickname: {type:String},
  hobbies:[String],
  description:{type:String},
});

//rescribe metodo toJSON para no mostrar __v y pass
//cuando se muestra la respuesta
UserSchema.methods.toJSON = function () {
  const { __v, pass, _id,  ...user } = this.toObject();
  user.uid = _id //transforma en vista el id mostrandolo como uid
  return user;
};

module.exports = model("User", UserSchema);
