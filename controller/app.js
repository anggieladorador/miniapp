const App = require("../models/app")


postApp  =async (req, res)=>{
  const { name, desc, link} = req.body
  const {id} = req.user
  console.log(id)
  const app = new App({name, desc, link})
  app.user = id
  app.save()
  
  res.json({
    msg:"app agregada",
    name,
    desc,
    link
  })
}

module.exports = {
  postApp
}