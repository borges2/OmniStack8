import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/dev/:id" component={Main} />
        </BrowserRouter>
    );
}

//BrowserRouter = Rota do navegador, roteamento no browser
//Route = rota
//Quando exporta uma função ela vira um componente. Serve para isolar um pedaço da aplicação, uma parte visual, ou alguma coisa que precisa repetir o funcionamento. Função que retorna um html.
//Retorna conteúdo HTML ou JSX (conteúdo html dentro do JavaScript)
//Precisa ter 1 Route por página
//path="/" significa que o usuário está na raiz, não possui nenhuma rota informada na barra de endereços
//Por padrão o react-router-dom não verifica se o caminho no navegador é exatamente igual a ("/"). Verifica se o caminho
//começa com ("/") ai sempre vai chamar a primeira rota (Login). Para corrigir o erro usa exact na primeira rota
//Rota main vai receber um parâmetro na rota que é o id do usuário logado. (/dev/:id).

