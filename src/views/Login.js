import React, {Component} from 'react';
import {Dimensions, TextInput, View,StyleSheet,Text,Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const {width, height} = Dimensions.get('screen');

export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            login:'',senha:'', mensagem:''
        }
    }


    efetuaLogin(){

        const uri = 'https://instalura-api.herokuapp.com/api/public/login';

        const requestConfig = {
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            body: JSON.stringify({
                login: this.state.login,
                senha: this.state.senha
            }),
            method: 'POST',
        };

        fetch(uri, requestConfig).then(response=>{
            if(response.ok) return response.text();
            throw new Error("Login ou senha inválidos ");
        }).then(token=>{
            AsyncStorage.setItem('token',token);
            AsyncStorage.setItem('login',this.state.login);
            return AsyncStorage.getItem('token')
        })
        .then(token=>this.props.navigation.navigate('Feed'))
        .catch(e=> {
            this.setState({mensagem: e.message});
        })
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.heading}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput  style={styles.input} placeholder="Digite seu usuário..." autoCaptalize="none" onChangeText={login => this.setState({login})} />
                    <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry={true} onChangeText={senha=>this.setState({senha})}/>
                    <Button onPress={this.efetuaLogin.bind(this)} title="Login"/>
                </View>
                <Text style={styles.message}>
                    {this.state.mensagem}
                </Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
      fontWeight: 'bold',
      fontSize: 26
    },
    form: {
        width: width*0.8
    },
    input:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 40
    },
    message: {
        marginTop: 15,
        color: '#e74c3c'
    }

});