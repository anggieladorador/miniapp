
const App = require("../models/app")
const ObjectId = require("mongoose").Types.ObjectId;


const postApp  = async (req, res)=>{
  const { name, desc, link} = req.body
  const {id} = req.user

  const app = new App({name, desc, link})
  app.user = id
  await app.save()
  
  res.json({
    msg:"app agregada",
    name,
    desc,
    link
  })
}

const getAppsByUserId = async (req, res)=>{
  const {id} = req.user
  const apps = await App.find({ user: ObjectId(id)})

  if(!apps){
    return res.status(404).json({
      msg: "no hay aplicaciones agregadas por este usuario"
    })
  }
  else{
    return res.json({
      app: apps
    })
  }
}

const deleteApp = async (req, res)=>{
  const {id} = req.params
  const userId = req.user.id
  const userApp = await App.findById(id)
  console.log(userApp)
  if(userApp.user !=userId ){
    return res.status(401).json({
      msg:"No puedes eliminar esta aplicación - usuario no corresponde"
    })
  }
  const  app = await App.findByIdAndUpdate(id, {isActive:false})

  res.json({
    msg:"Aplicación Eliminada"
  })

}

module.exports = {
  postApp,
  getAppsByUserId,
  deleteApp
}