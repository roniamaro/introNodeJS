const http = require("http");

/**
 * req -> é a requisição que estamos recebendo
 * res -> é a resposta que daremos 
 * para startar o servidor -> no terminal "node server.js"
 * para visualizar o servidor rodando -> no chrome "localhost:4001"
*/
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.url === '/produtos') {
    response.end(JSON.stringify({
      message: 'Rota de produtos',
    }));    
  }

  if (request.url === '/usuarios') {
    response.end(JSON.stringify({
      message: 'Rota de usuários',
    }));    
  }

  response.end(JSON.stringify({
    message: 'Hello World!',
  }));
  
}).listen(4001, () => console.log("Servidor está rodando na porta 4001"));