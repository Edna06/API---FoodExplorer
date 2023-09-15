// imports
require("express-async-errors")
const AppError = require("./utils/AppError")

require("dotenv/config")
//configuração das imagens enviadas
const uploadConfig = require("./configs/upload");
const uploadAvatarConfig = require("./configs/uploadAvatarUser");

const corsInit = require("cors");

const migrationsRun = require("./database/sqlite/migrations");

const express = require("express");
const routes = require("./routes")

//initializing
const app = express();
app.use(express.json());

app.use("/files/dishFiles", express.static(uploadConfig.UPLOADS_FOLDER));
app.use("/files/avatarFiles", express.static(uploadAvatarConfig.UPLOADSAVATAR_FOLDER));

app.use(routes);
//inicialização do cors
app.use(corsInit());

migrationsRun(); //executando o banco de dados

app.use((error,request,response, next) => {

    if(error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message});
    }
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error"})
  })

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {console.log(`Server is running on Port ${PORT}`)});