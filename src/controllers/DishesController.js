
const knex = require("../database/knex");

class DishesController{
  async create(req, res){
    const {title, description, category, image, price, ingredients} = req.body;

    const dish_id = (await knex("dishes").insert({
      title,
      description,
      category,
      price
    }))[0];


    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        title: ingredient,
        dish_id
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.status(201).json()
  }
};

module.exports = DishesController;