const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps: true,
});

module.exports = model('Dev', DevSchema);

    //timestamps vai criar coluna de forma automática chamada:
    //createdAt em cada registro que for salvo (guarda a data de criação do registro). Outra coluna chamada:
    //updatedAt em cada registro que for salvo (data da última alteração do registro). Preenchido automático pelo mongoose.
    //[] significa vetor
    //Arquitetura MVC
    //Model = Abstração da nossa tabela, estrutura do banco de dados para o tipo de entidade que está criando
    //View = front-end no react, não utiliza no back-end, feito apenas a API
    //Controller = regra de negócio da aplicação, armazenar no banco em uma primeira instância
    //(const {} = require('mongoose')) importar de dentro do mongoose utilizando recurso do javaScript que se chama desestruturação
    //(Schema) estrutura da tabela no banco de dados para armazenar desenvolver 
    //(module.exports) exportar o model aqui de dentro
    //(model('Dev', DevSchema)) função para exportar o model com o nome (Dev) que vai ser utilizado depois e a estrutura do model DevSchema