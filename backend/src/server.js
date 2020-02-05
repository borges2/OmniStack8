const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {
    //'sdfsdf8555585 (id_do_usuario)': 'id_do_socket'
};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    //console.log(user, socket.id);
    connectedUsers[user] = socket.id;

    /*
    console.log('Nova conexão', socket.id);

//ouvindo mensagem
    socket.on('hello', message => {
        console.log(message)
    })

    setTimeout(() => {
        //Emitindo mensagem
        socket.emit('world', {
            message: 'OmniStack'
        });
    }, 5000)
    */
});

mongoose.connect('mongodb+srv://admin:admin01024462@servidor-syms6.mongodb.net/omnistack8?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//Interceptador que a gente consegue modificar a requisição de alguma forma para que chegue
//no controler de uma forma diferente. Como se fosse uma rota dentro d aplicação. Next serve para
//fazer o fluxo seguir na aplicação. WebSocket. Pode adicionar variáveis dentro do (req).
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
//Serve para o express entender que as informações (req) serão em json
app.use(express.json());
//Adicionando plugin/configuração que está em outro arquivo para dentro do server, configuração de outro arquivo, modulo
app.use(routes);
//Porta sendo utilizada
server.listen(3333);

//(.) O ponto serve para referenciar a própria pasta
//(CORS) = permitir que a aplicação seja acessada por qualquer endereço. O react pode acessar a aplicação.
//O react vai poder acessar a aplicação. O react tenta fazer uma requisição e não é bloqueado
//Comando yarn init -y = cria arquivo chamado package.json. Arquivo que está presente em todo aplicação que envolve javaScript.
//O arquivo mantem informações do projeto. Anota informações das dependências que são instalados dentro do projeto
//(EXPRESS) É um micro framework para o node, ajuda a lidar com rotas, tanto na parte de requisições e respostas para o servidor.
//(Rotas) minhaaplicacao.com.br/users, está retornando usuários utilizando (GET)
//(YARN.LOCK) arquivo de cash, armazena informações entre as dependências das nossas dependências. Ele consegue mapear quais são
//as dependências das outras dependências. Fica casheado e fica bem mais rápido a instalação depois
//(SRC) facilita incluir todo código que vai ser gerido pelo time dentro de um único local.
//Express é uma função, quando chamada ela cria um novo servidor. Uma nova porta de entrada para receber requisições e retornar respostas.
//Variável do tipo (const) não sofre alterações
//(LISTEN) qual porta meu servidor vai ouvir.
//(server.get('/', (req, res) => {req.query.name})) o endereço que eu quero ouvir. O (/) é quando não passa nada na url
//Segundo parâmetro, (arrow function)
//Métodos principais utilizados dentro de uma API, métodos HTTP, API rest são:
//(GET) buscar alguma informação da API
//(POST) criar algum tipo de registro, entidade dentro da API
//(PUT) editar registro/entidade
//(DELETE) excluir registro
//Quando navegador faz chamada de rota, sempre utiliza método GET
//(POST) utiliza formulário HTML, tem capacidade de enviar método POST
//(REQ) Informações que são ref. a requisição do usuário pela url
//(RES) Objeto que vai utilizar para retornar uma resposta para o cliente.
//Cliente faz uma requisição para o servidor e o servidor devolve uma resposta
//(RES.SEND('Hello World')) para retornar resposta do tipo texto no navegador
//(?) A interrogação na url serve para indicar que está enviando um parâmetro para API
//(localhost:3333/?name=Diego) Dentro do req existe o query onde contem todos os parâmetros que envia através
//da url, rota (queryParams)
//(RES.SEND(`Hello ${req.query.name}`)) ${} (template strings) serve para passar variáveis dentro da chave
//(JSON) Estrutura de comunicação unificada, estrutura de dados (javaScript Object notation)
//(JSON) tem a cara de um objeto do javaScript
//Retorno usando json sempre retorna objeto ou vetor
//return res.json({message: `Hello ${req.query.name}`})
//(Ctrl+C) encerrar servidor
//(YARN ADD NODEMON -D) Para não ficar reiniciando servidor na mão toda hora que tem modificação no código
//(-D) Dependência de desenvolvimento. Não vai utilizar quando aplicação estiver em produção, apenas em desenvolvimento
//(PACKAGE.JSON) criar propriedade "scripts" e dentro da chave {} passa o objeto com o nome "dev" para rodar o "nodemon src/server.js"
//(YARN DEV) inicia o servidor
//(./) serve para referenciar a própria pasta
//Utilizado para importar arquivo dentro do node que o usuário criou e não um módulo instalado de outra pessoa
//(server.use(routes)) quando quer colocar algum tipo de configuração de outro arquivo ou em outro módulo utiliza o (use). Adicionando
//um módulo ou plugin dentro do servidor
//(yarn add mongoose) É um ODM, ferramenta que vai facilitar trabalhar com banco de dados utilizando unicamente sintaxe de javaScript para comunicar com o banco
//(insert into table) troca por user.insert({})
//Não utiliza sintaxe do banco de dados. ORM - banco de dados relacional
//(mongoose.connect) faz conexão com o banco de dados (url de conexão)
//(mongoose) aceita vários formatos na url de conexão, para corrigir o erro que aparece no servidor utiliza
//(useNewUrlParser) passando para true, novo formato