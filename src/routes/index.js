//imports
const {Router} = require("express");

const usersRouter = require("./users.routes");

const routes = Router();
//grups de rotas
routes.use("/users", usersRouter);


module.exports = routes;