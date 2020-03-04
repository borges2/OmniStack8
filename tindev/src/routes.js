import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Main from './pages/Main';
//import Ajuda from './pages/Ajuda';

export default createAppContainer(
    createSwitchNavigator({
        //Ajuda,
        Login,
        Main,
    })
);