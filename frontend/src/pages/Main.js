import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../services/api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        })
        /*
        socket.on('world', message => {
            console.log(message);
        })

        setTimeout(() => {
            socket.emit('hello', {
                message: 'Hello World'
            })
        }, 3000);
        */

        //Emitir mensagem para o backend depois de 3seg. Identificação da msg 'hello'. Pode enviar
        //string, objeto.

    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty">Acabou :(</div>
                )}
            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt="" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                </div>
            )}
        </div>
    )
}

//O react-router-dom inclui uma propriedade no nosso componente chamado (match). Dentro do match possui todos os parâmetros
//que foram passados para essa rota. Ex.: ({match.params.id}). id - é o nome do parâmetro informado na rota.
//Tag (ul) - ListItem, lista de itens sem ordem rígida.
//Tag (footer) - É um box que vai ficar abaixo da imagem avatar. Onde vai ficar o nome do usuário github e a bio, um rodapé.
//Tag (p) - Parágrafo
//Tag (li) - Representa uma entidade, um item que faz parte da lista de itens.

/*
useEffect - Serve para fazer uma chamada a API assim que o componente for exibido em tela. Buscar na api os desenvolvedores.
Função que recebe dois parâmetros. 1 - função que quer executar, 2 - quando quer executar essa função. Pode passar variáveis dentro de um array.
Toda vez que essas variáveis forem alteradas, a função será executada novamente. Se informar um array vazio, a função será executada apenas uma vez dentro do componente.
A função - Vai na api nodeJS, busca os dados dos devs e vai armazenar pra gente poder mostrar esses dados em tela.
Uma boa prática do react que recomenda é não utilizar o async dentro dessa função.
O certo é criar uma função async dentro dessa função.
(() => {}, []) - Arrow functions - passando funções para componentes
useState - Toda vez que precisa ter uma variável que vai ser manipulada pelo componente, seja alterando valores ou somente acessando valores,
guarda ela no estado.
users.map() - Serve para percorrer um array e retornar alguma coisa.
Toda vez que utiliza a função (map) para criar uma lista de elementos, o primeiro elemento que vem depois do map, precisa ter uma propriedade
chamada (key) utilizado pelo react na hora que precisar remover algum elemento de dentro, adicionar um novo, mudar de posição.
Para ele saber qual elemento é qual. Senão toda vez precisa renderizar a lista do zero perdendo performance.
Função handleLike(id) - Toda ação que é gerada a partir de uma interação do usuário, geralmente o nome da função começa com handle. Não precisa mais é uma forma de padronizar funções.
Se passar como parâmetro o código do usuário (_id), será dado dislike para todos os usuários da lista de devs do usuário logado que ainda não foram dados likes e nem dislikes.
Quando coloca parênteses por volta da função, automaticamente quando chegar na função, será executado. Não vai passar a referência da função como parâmetro para o onClick.
Um raquezinho que o pessoal usa é utilizar o (arrow function).
api.post(`/devs/${id}/dislikes`) - Método post recebe também como parêmetro o (Header - user), o usuário que está dando o dislike.
O segundo parâmetro do método post é o (body - corpo da requisição). No nosso caso o body está vazio, nesse caso atribui null no segundo parâmetro.
No terceiro parâmetros é enviado os headers.
users.filter - Serve para filtrar os usuários que sejam diferentes dos usuários que receberam like/dislike.
Nunca poderá mexer na variável (users) diretamente. Sempre altera o valor da variável (users) usando a função (setUsers). Mesmo o (users) sendo um array não
pode tratar como um array. Precisa sobrescrever o valor da variável (users) utilizando a função (setUsers).
Link - importado de dentro do (react-router-dom), serve para criar uma âncora, um link para retornar para tela de login.
*/