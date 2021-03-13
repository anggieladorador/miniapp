
const roleValidator = (req, res, next )=>{
  if(!req.user){
    return res.status(500).json({
      msg:"No se está validando token previo"
    })
  }
  const {role} = req.user
  if(role !=  "ADMIN_ROLE"){
    return res.status(401).json({
      msg: "No tienes permiso para esto"
    })
  }
  next()
 
}

const hasRole = (...roles)=>{
  return (req, res, next)=>{
    console.log(req.params)
    console.log(req.user.id)
    const {role, id}= req.user
    
    if(roles.includes(role)){
      if( role == "USER_ROLE"  &&  id != req.params.id){
        return res.status(401).json({
          msg:"no tienes permiso para esto, no eres admin o no eres el usuario con esta cuenta"
        })
      }
    }
    next()
  }

}

module.exports = {roleValidator, hasRole}