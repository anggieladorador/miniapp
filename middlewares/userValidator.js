const User = require("../models/user")

const isNicknameRegistered = async(req,res,next)=>{
  const {nickname} = req.params
    const exist = await User.findOne({nickname})
    if(!exist){
      return res.status(404).json({
        msg:"Usuario no encontrado"
      })
    }
    next()
  
}

module.exports = {isNicknameRegistered}