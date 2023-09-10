//imports
const {Router} = require("express");

const DishesController = require("../controllers/DishesController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get('/:id', dishesController.show );
dishesRoutes.get('/', dishesController.index);



module.exports = dishesRoutes;
