import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;

//Todas as rotas da API iniciam com (http://localhost:3333). Precisa falar para o axios que todas as requisições, quero que coloca esse endereço no início.
//Dessa forma não precisa ficar digitando toda vez. Se algum dia a API trocar de endereço fica mais fácil de fazer alterações.

