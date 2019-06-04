import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Feed from '../views/Feed';
import Login from '../views/Login';

const RootStack = createStackNavigator(
    {
        'Login': Login,
        'Feed': Feed
    },
    {
        initialRouteName: 'Login',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {

    render(){
        return(
            <AppContainer/>
        );
    }
}



