const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    //const response = await axios.get('https://api.github.com/users/EvertonGavioli');
    //const response = await axios.get('https://api.github.com/users/renathu');
    const response = await axios.get(`https://api.github.com/users/${username}`);

    if (!response.data.name || !response.data.bio) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    //console.log(req.body.username);
    //console.log(response.data);

    return res.json(dev);

    //return res.json(username);

    //($and) = Aplica o and nos três filtros de 1x só
    //($ne) = not equal
    //($nin) = not in
    //Existe algumas boas práticas dentro do desenvolvimento de API, dentro do MVC.
    //O controler não pode ter mais que 5 métodos fundamentais que são:
    //INDEX = para fazer uma lista daquele recurso
    //SHOW = para retornar um único daquele recurso
    //STORE = inserir
    //UPATE = alterar
    //DELETE = excluir
    //(controllers) é responsável pela lógica da aplicação por receber as requisições e formular uma resposta
    //(module.exports) O controler pode ser um objeto e utiliza essa função para exportar um objeto de dentro das chaves {}
    //(axios) serve para acessar api. Faz requisições em APIs externas. (yarn add axios) É um pacote adicionado dentro do node
    //(axios.get()) é assíncrono, ele demora para executar.
    //(async + await) serve para aguardar a execução da função para prosseguir próxima linha de comando
    //(Dev.create) cria registro no banco de dados
    //(index()) serve para listar devs
  }
};
