
const App = require("../models/app")
const ObjectId = require("mongoose").Types.ObjectId;


const postApp  = async (req, res)=>{
  const { name, desc, link} = req.body
  const {id} = req.user
  console.log(id)
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

module.exports = {
  postApp,
  getAppsByUserId
}