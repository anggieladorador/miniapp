const User = require("../models/user");

const isRegistered = async (email) => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error(`error, ${email} está registrado`);
  }
};
const isIdRegistered = async(id)=>{
  const exist = await User.findById(id)
  if(!exist){
    throw new Error(`error, este usuari0 no sé encuentra`)
  }
}
const isNicknameRegistered = async(nickname)=>{
  const exist = await User.findOne({nickname})
  if(!exist){
    throw new Error (`no hay usuarios con el nickname ${nickname}`)
  }
}
module.exports = {
  isRegistered,
  isIdRegistered,
  isNicknameRegistered
};
