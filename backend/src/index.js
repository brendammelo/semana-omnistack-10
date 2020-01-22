const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { setupWebsocket } = require('./websocket');
const mongoURL = require('./mongoURL.js')

const app = express();
const server = http.Server(app); //server http fora do express

setupWebsocket(server);

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// .use é valido para todas as rotas da aplicação
app.use(cors()); //cors é para liberar acesso externo a aplicação
app.use(express.json());
app.use(routes);

//Métodos HTTP:
//get- receber info, post - criar info(salvar produto)
//put - editar, delete deletar info

//Tipos de parametros;
//Query Params: req.query ex fazer buscasfiltros, ordenaçao, fica na url (search=brenda)
//Route Params: req.params (Identificar um recurso na alteração ou remoção)
//Body: req.body (Para criação ou alteração de um registro)



server.listen(3333);
