//imports
const {Router} = require("express");

const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.post('/', dishesController.create);
dishesRoutes.get('/:id', dishesController.show );
dishesRoutes.get('/', dishesController.index);
dishesRoutes.delete('/:id', dishesController.delete );
dishesRoutes.put('/:id', dishesController.update);



module.exports = dishesRoutes;
