const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const getUser = async(req, res = response) => {
  //en caso que la url sea /api/user?q=nombre&otracosa=texto
  //const params = req.query;
  //para paginar 
  const {limit = 5, from = 0} = req.query
  const query = {estado:true}
  /*const usuarios = await User.find(query)
    .skip(Number(from ))
    .limit(Number(limit)) //se entrega limite como string así que se parsea a numero
  const quantity = await User.countDocuments(query)*/

  /*MEJOR FORMA DE PEDIRLO */
  /* const [total, users] destructuración de un arreglo */
  const [total, users] = await Promise.all([ //esto hace las promesas en paralelo
    await User.countDocuments(query),
    await User.find(query)
      .skip(Number(from ))
      .limit(Number(limit)) 
  ])
  res.json({
    total,
    users
  });
};
const postUser = async (req, res = response) => {
  console.log(req.body);
  const { name, email, pass, google } = req.body;
  const user = new User({ name, email, pass, google });
  //hash password
  const salt = bcrypt.genSaltSync();
  user.pass = bcrypt.hashSync(pass, salt);
  //guardar
  user.save();
  res.json({
    msg: "post",
    name,
    email,
    pass,
    google,
  });
};

const updateUser = async(req, res = response) => {
  const {id} = req.params
  const {_id, pass, google,email, ...rest} = req.body //se excluye la contraseña, google  y el email de la actualización
  if(pass){
     //hash password
    const salt = bcrypt.genSaltSync();
    rest.pass = bcrypt.hashSync(pass, salt); //se agrega contraseña hasheada al rest
  }
  const user = await User.findByIdAndUpdate(id,rest)

  res.json({
    msg: "put",
    user
  });
};

const deleteUser = async(req, res = response)=>{
  const {id}=req.params
  const user = await User.findByIdAndUpdate(id, {estado:false})
  res.json({
    msg:"eliminado", 
    user
  })

}

module.exports = {
  getUser,
  postUser,
  updateUser,
  deleteUser
};