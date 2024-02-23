const express = require("express");
const { randomUUID } = require("crypto"); //cria um ID Universal

const app = express();

app.use(express.json());

const products = [];

/**
 * para startar o servidor -> no terminal "npm run dev" lembrando que foi criado o script para "dev" no arquivo package.json
 *
 * POST   -> inserir um dado
 * GET    -> buscar um dado
 * PUT    -> alterar um dado
 * DELETE -> remover um dado
 * 
 * body -> sempre que eu quiser enviar dados para minha aplicação
 * params -> /product/1234 - parametros de rotas
 * query -> /product?id=1234&value=1234 - parametros que vem da query
*/

//Rota de teste
app.get("/", (request, response) => {
  return response.json({
    message: "Acessou a primeira rota com nodemon",
  });
});

//Cadastro de produto
app.get("/products", (request, response) => {
  const { name, price } = request.body;
  const body = request.body;
  console.log(body);
  /**const product = {
    id: randomUUID(),
    name,
    price
  };

  products.push(product);

  return response.json(product);
  */
});

//Listar os produtos
app.get("/products", (request, response) => {
  return response.json(products);
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));