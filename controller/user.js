const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

const getUser = async (req, res = response) => {
  //en caso que la url sea /api/user?q=nombre&otracosa=texto
  //const params = req.query;
  //para paginar
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };
  /*const usuarios = await User.find(query)
    .skip(Number(from ))
    .limit(Number(limit)) //se entrega limite como string así que se parsea a numero
  const quantity = await User.countDocuments(query)*/

  /*MEJOR FORMA DE PEDIRLO */
  /* const [total, users] destructuración de un arreglo */
  const [total, users] = await Promise.all([
    //esto hace las promesas en paralelo
    await User.countDocuments(query),
    await User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};
const getById = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).populate({
    path: 'apps',
    populate: { path: 'apps' },
  });
  res.json({
    msg: 'encontrado',
    user,
  });
};

const getByNickname = async (req, res) => {
  const { nickname } = req.params;
  const user = await User.findOne({ nickname }).populate('apps', {
    _id: 0,
    __v: 0,
  });
  res.json({
    msg: 'buscando por nickname',
    user,
  });
};
const postUser = async (req, res = response) => {
  const { name, email, pass, google } = req.body;
  const user = new User({ name, email, pass, google });
  //hash password
  const salt = bcrypt.genSaltSync();
  user.pass = bcrypt.hashSync(pass, salt);
  //guardar
  user.save();
  res.json({
    msg: 'post',
    name,
    email,
    pass,
    google,
  });
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, pass, google, email, ...rest } = req.body; //se excluye la contraseña, google  y el email de la actualización

  if (pass) {
    //hash password
    const salt = bcrypt.genSaltSync();
    rest.pass = bcrypt.hashSync(pass, salt); //se agrega contraseña hasheada al rest
  }
  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: 'put',
    user,
  });
};

const addHobbies = async (req, res) => {
  const body = req.body;

  const { id } = req.params;

  let hobbies = body.map((item) => item.hobbie);
  hobbies = hobbies.filter((hobbie, index) => {
    return hobbies.indexOf(hobbie) === index;
  });
  const user = await User.findByIdAndUpdate(id, {
    $set: {
      hobbies,
    },
  });
  res.json({
    msg: 'hobbies',
    user,
  });

  //anggie del pasado: Si quieres borrar algo del array usa $pull:hobbie
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const authUser = req.user;
  const user = await User.findByIdAndUpdate(id, { isActive: false });
  res.json({
    msg: 'eliminado',
    authUser,
    user,
  });
};

module.exports = {
  getUser,
  getById,
  postUser,
  updateUser,
  deleteUser,
  addHobbies,
  getByNickname,
};
