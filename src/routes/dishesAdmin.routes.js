//imports
const {Router} = require("express");

const DishesAdminController = require("../controllers/DishesAdminController");

const dishesAdminRoutes = Router();

const dishesAdminController = new DishesAdminController();

dishesAdminRoutes.post('/', dishesAdminController.create);
dishesAdminRoutes.delete('/:id', dishesAdminController.delete);
dishesAdminRoutes.put('/:id', dishesAdminController.update);

module.exports = dishesAdminRoutes;
