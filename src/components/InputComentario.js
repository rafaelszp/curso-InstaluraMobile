import React, {Component} from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

const sendImage = require('../resources/images/send.png');

export default class InputComentario extends Component {

    constructor(){
        super();
        this.state ={
            newComment: ''
        };
    };

    render(){

        const {commentAddCallback,fotoId} = this.props;

        return (
            <View style={styles.container}>
                <TextInput
                    placeHolder="Adicione um comentário..."
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    ref={input => this.commentIn = input}
                    onChangeText={text => this.setState({newComment: text})}
                />
                <TouchableOpacity onPress={ ()=> {
                    commentAddCallback(fotoId,this.state.newComment,this.commentIn);
                    this.setState({newComment: ''});
                }}>
                    <Image source={sendImage} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 5,
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    input:{
        flex: 1,
        height: 40
    },
    icon:{
        width: 30,
        height: 30
    }
});