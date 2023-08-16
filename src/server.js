// imports
const express = require("express");

const routes = require("./routes")



//initializing
const app = express();
app.use(express.json());//passando informações do padrão de conteúdo recebido da requisição

app.use(routes);//utilizando as rotas

const PORT = 3333;

app.listen(PORT, () => {console.log(`Server is running on Port ${PORT}`)});