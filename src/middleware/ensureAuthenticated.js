//imports
const authJwtConfig = require("../configs/auth");
const {verify} = require("jsonwebtoken");

const AppError = require("../utils/AppError");


function ensureAuthenticated(req, res, next){
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT não existe", 401);
  }

  const [ , token] = authHeader.split(" ");

  //verificação para identificar se o token é válido
  try{
    const { sub: user_id } = verify(token, authJwtConfig.jwt.secret);

    req.user = {
      id: Number(user_id)
    };

     return next();
  } catch {
    throw new AppError("JWT inválido", 401);
  };
}

module.exports = ensureAuthenticated;