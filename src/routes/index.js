//imports
const {Router} = require("express");

const usersRouter = require("./users.routes");
const dishesRoutes = require("./dishes.routes");

const routes = Router();
//grups de rotas
routes.use("/users", usersRouter);
routes.use("/dishes", dishesRoutes);


module.exports = routes;