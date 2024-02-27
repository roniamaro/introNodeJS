const { error } = require("console");
const express = require("express");
const app = express();
const fs= require("fs")

//const { randomUUID } = require("crypto"); //cria um ID Universal

app.use(express.json());

let products = [];
fs.readFile("products.json", "utf-8", (err, data) => {
  if(err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

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
/**
app.get("/", (request, response) => {
  return response.json({
    message: "Acessou a primeira rota com nodemon",
  });
});
*/

//Cadastro de produto
app.post("/products", (request, response) => {
  const { name, price } = request.body;
  
  const product = {
    id: randomUUID(),
    name,
    price
  };

  products.push(product);

  productFile();

  return response.json(product);
});

//Listar os produtos
app.get("/products", (request, response) => {
  return response.json(products);
});

//Listar produto by ID
app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find(product => product.id === id);
  return response.json(products);
});

//Alterar produto by ID
app.put("products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;
  const productIndex = products.findIndex(product => product.id ===id);

  //put
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  productFile();
  
  return response.json({ message: "Produto alterado com sucesso"});
})

//Deletar produto by ID
app.delete("products/:id", (request, response) => {
  const { id } = request.params;
  const productIndex = products.findIndex(product => product.id ===id);
  
  //delete
  products.splice(productIndex, 1);

  productFile();

  return response.json({message: "Produto removido com sucesso"});
})

//Função criar produto "file"
function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err)      
    } else {
      console.log("Produto inserido no arquivo externo");
    }
  });  
}

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));