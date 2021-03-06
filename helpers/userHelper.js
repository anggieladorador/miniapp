const User = require("../models/user");

const isRegistered = async (email) => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error(`error, ${email} está registrado`);
  }
};
isIdRegistered = async(id)=>{
  const exist = await User.findById(id)
  if(!exist){
    throw new Error(`error, este usuarip no sé encuentra`)
  }
}
module.exports = {
  isRegistered,
  isIdRegistered
};
