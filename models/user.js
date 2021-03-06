const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, required: [true, "el nombre es obligatorio"] },
  email: { type: String, unique: true },
  pass: { type: String, required: [true, "la contraseña es obligatoria"] },
  img: { type: String },
  //rol: { type: String, required: true, emun: ["ADMIN_ROLE", "USER_ROLE"] },
  estado: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

//rescribe metodo toJSON para no mostrar __v y pass
//cuando se muestra la respuesta
UserSchema.methods.toJSON = function () {
  const { __v, pass, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
