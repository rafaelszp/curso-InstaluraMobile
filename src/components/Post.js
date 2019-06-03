import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import InputComentario from './InputComentario'
import Like from './Like'

const {width, height} = Dimensions.get('screen');

export default class Post extends Component {

    constructor(props) {
        super(props);

        const foto = {...this.props.foto};
        this.state = {foto, newComment: ''};
    }





    render() {


        const {commentCallback,likeCallback,foto} = this.props;

        const showTitle = (foto) => {

            return (
                <View style={styles.title}>
                    <Text style={styles.titleUsername}>{foto.loginUsuario}:</Text>
                    <Text style={styles.titleUserMessage}>{foto.comentario}</Text>
                </View>
            )
        };

        const showComments = (foto) => {
            return foto.comentarios.map(comentario =>
                <View style={styles.comments} key={comentario.id}>
                    <Text style={styles.commentUsername}>{comentario.login}:</Text>
                    <Text style={styles.commentUserMessage}>{comentario.texto}</Text>
                </View>
            );
        };

        return (
            <View style={styles.post}>
                <View style={styles.profile}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.profileFoto}/>
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={{uri: foto.urlFoto}} style={styles.postImage}/>
                <View style={styles.interactions}>

                    <Like foto={foto} likeCallback={() => {likeCallback(foto.id)}}/>

                    {showTitle(foto)}
                    {showComments(foto)}

                    <InputComentario commentAddCallback={commentCallback} fotoId={foto.id}/>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    post: {
        textAlign: 'left',
        width
    },
    profile: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileFoto: {
        borderRadius: 20,
        marginRight: 5,
        width: 40,
        height: 40,
    },
    postImage: {
        width,
        height: width
    },
    interactions: {
        margin: 10
    },
    title: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    titleUsername: {
        marginRight: 5,
        fontWeight: 'bold'
    },
    titleUserMessage: {},
    comments: {
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: '#eee'
    },
    commentUsername: {
        marginRight: 5,
        fontWeight: 'bold'
    },
    commentUserMessage: {},

});