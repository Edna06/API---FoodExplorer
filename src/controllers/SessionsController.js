//imports
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const {compare} = require("bcryptjs");

const authJwtConfig = require("../configs/auth");
const {sign} = require("jsonwebtoken");

class SessionsController {

  async create(req, res){
    const {email, password} = req.body;

    const user = await knex("users").where({email}).first();

    if(!user){
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    const matchedPassword = await compare(password, user.password);

    if(!matchedPassword){
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    //irá me gerar um token de autenticação
    const {secret, expiresIn} = authJwtConfig.jwt;
    const token = sign({}, secret, {subject: String(user.id), expiresIn});

    return res.json({user, token});
  }
};

module.exports = SessionsController;