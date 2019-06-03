import React, {Component} from 'react';
import {Dimensions, TextInput, View,StyleSheet,Text,Button} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class Login extends Component {

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.heading}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput  style={styles.input} placeholder="Digite seu usuário..."/>
                    <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry={true}/>
                    <Button onPress={() => console.warn('botão pressioonado')} title="Login"/>
                </View>
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
    }

});