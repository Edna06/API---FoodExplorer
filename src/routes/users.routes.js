//imports
const {Router} = require("express");
const multer = require('multer');
const uploadAvatarConfig = require('../configs/uploadAvatarUser');

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const UserController = require("../controllers/UserController");
const UserAvatarController = require('../controllers/UserAvatarController');

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const usersRoutes = Router();
const upload = multer(uploadAvatarConfig.MULTER);

usersRoutes.post("/", userController.create);
usersRoutes.put("/",ensureAuthenticated, userController.update);

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = usersRoutes;