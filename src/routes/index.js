//imports
const {Router} = require("express");

const usersRouter = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const dishesAdminRoutes = require("./dishesAdmin.routes")
const sessionsRoutes= require("./sessions.routes");

const routes = Router();
//grups de rotas
routes.use("/users", usersRouter);
routes.use("/dishes", dishesRoutes);
routes.use("/adminDishes", dishesAdminRoutes);
routes.use("/sessions", sessionsRoutes);


module.exports = routes;