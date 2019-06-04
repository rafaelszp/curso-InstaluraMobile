import React, {Component} from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';
import Feed from '../views/Feed';
import Login from '../views/Login';
import AuthLoadingScreen from '../views/AuthLoading';
import { useScreens } from 'react-native-screens';
useScreens();

const AppStack = createStackNavigator({
        'Feed': Feed,
},{
    initialRouteName:'Feed',
    headerMode: "none"
});

const AuthStack = createStackNavigator(
    {
        'Login': Login,
    },
    {
        initialRouteName: 'Login',
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        'AuthLoading': AuthLoadingScreen,
        'App': AppStack,
        'Login': AuthStack
    },{
        initialRouteName: 'AuthLoading',
        headerMode: "none"

    }
));

export default class App extends Component {

    render(){
        return(
            <AppContainer/>
        );
    }
}



