const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();

//GET = adquirir, POST = gravar, PUT = alterar, DELETE = excluir
//função store (serve para salvar no banco o registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;

//Aplicação tende a ter muitas rotas separa as rotas do servidor em um arquivo isolado
//(express.Router()) Função para criar objeto específico para rotas
//(module.exports) exportar rotas de dentro para que o server reconheça essas rotas
//(routes.post) Serve para criar/cadastrar alguma informação dentro da aplicação
//('/devs') é o caminho da rota na url http://localhost:3333/devs
//Requisição do tipo (POST) sempre envia os dados pelo corpo da requisição no insomnia formato json
//Para pegar as informação do corpo da requisição utiliza (req.body)