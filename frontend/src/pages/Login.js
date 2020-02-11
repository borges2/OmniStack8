import React, { useState } from 'react';
import './Login.css';
import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        //bloquear redirecionamento
        e.preventDefault();

        try {
            const response = await api.post('/devs', {
                username,
                //username: username
                //como a variável username (corpo da requisição) tem o valor username. O nome do corpo da requisição é igual
                //o nome da variável. Nesse caso pode usar a (short sintaxe do ES6).
            });

            //if (response.data.name == null || response.data.bio == null) {
            //  alert('Usuário inválido');
            //}

            const { _id } = response.data;

            history.push(`/dev/${_id}`);
        }
        catch (e) {
            if (e.response) {
                alert('Usuário inválido');
            }
            else {
                alert('Serviço indisponível');
            }

            //Focar componente.
            document.getElementById("inputNomeUsuario").focus();
            //Tirar foco do componente.
            //document.getElementById("inputNomeUsuario").blur();
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    id="inputNomeUsuario"
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

//Conceito dentro do react (Estado) - O estado de um componente é toda e qualquer informação que o componente
//vai manipular. Que ele precisa modificar aquela informação, acessar aquela informação de alguma forma.
//Para utilizar (estado) dentro do react, importa junto com o React o (useState)
//Variável que vai ser manipulada por componente.
//OnChange = Função do html padrão JavaScript, disparado automaticamente toda vez que houver uma alteração no input.
//Quando pega essa função no html, não recebe exatamente o texto que digitou no input, recebe um evento.
//Declara uma função dentro do onChange (e =>) o (e) significa que está recebendo o evento. Função que recebe o evento.
//Função (handleSubmit) - função disparada quando o usuário der submit nesse form.
//Dentro do form utiliza a função (onSubmit) e passa a função (handleSubmit) no formato JavaScript, dentro de chaves.
//Essa função recebe um evento como parâmetro.
//Por padrão qdo usuário da um submit ele redireciona o usuário pra outra página 
//(e.preventDefault) - vai prevenir o comportamento padrão do formulário que é de redirecionamento e
//vai bloquear esse redirecionamento.
//Propriedades - São atributos que são informados para cada tag html. Ex.: <img src={logo}.
//Todos os componentes que são rotas, eles automaticamente herdam uma propriedade chamada (history) de dentro do react-router-dom
//Com a propriedade (history) serve para fazer a navegação (history.push('/main')).
//Pasta services - Armazena qualquer tipo de serviço que vai fazer comunicação com algum meio de informações esternas. Prestador de dados esterno. Configuração da API

