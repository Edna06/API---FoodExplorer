
const knex = require("../database/knex");

class DishesController{

  async create(req, res){
    const {title, description, category, image, price, ingredients} = req.body;

    //me retornará o id do prato, além de inserir na tabela dishes essas informações
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
  };

  async show(req, res){
    const {id} = req.params;

    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("title");

    return res.status(200)
    .json({
      ...dish,
      ingredients
    })
  };

  async delete (req, res){
    const {id} = req.params;

    await knex("dishes").where({id}).delete();

    return res.status(200).json();
  };


};

module.exports = DishesController;