//import
const {Router} = require("express")

const usersRoutes = Router();

usersRoutes.post("/", (req, res) => {

  const {name, email, password, isAdmin} = req.body;

  res.json({name, email, password, isAdmin});
});


module.exports = usersRoutes;