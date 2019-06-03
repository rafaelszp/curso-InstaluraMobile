import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,TextInput} from 'react-native';

const {width, height} = Dimensions.get('screen');
const defaultUserFoto = require('../resources/images/user_male.png');
const logo = require('../resources/images/alura.jpg');
const unlikedImage = require('../resources/images/s2.png');
const likedImage = require('../resources/images/s2-checked.png');
const sendImage = require('../resources/images/send.png');

export default class Post extends Component {

    constructor(props) {
        super(props);
        const comentarios = [
            {login: 'entortadordevigas', 'texto':'foi u câum qui butô pa nois bebê',id:0},
            {login: 'amaciadordebigornas', 'texto':'show de bolinha',id:1},
            {login: 'enroladordevergalhoes', 'texto':'já matei mais de mil',id:2},
        ];
        const foto = {...this.props.foto, comentarios};
        this.state = {foto, newComment: ''};
    }

    getLikeImage(likeada) {
        return likeada ? likedImage : unlikedImage
    }

    handleLike() {
        let foto = this.state.foto;
        let likers = foto.likers || [];
        if(!foto.likeada){
            likers.push({'nome':'teste','login':'teste'})
        }else{
            likers = likers.filter(liker =>{
                return liker.login !== 'teste';
            });
        }
        const newFoto = {
            ...foto,
            likeada: !foto.likeada,
            likers
        };
        this.setState({foto: newFoto})
    }

    addComment(){

        if(!this.state.newComment || this.state.newComment.length===0) return;

        const comentarios = [...this.state.foto.comentarios,{
            'id': parseInt(Math.random()*1000),
            'login': 'encantadordeestatuas',
            'texto': this.state.newComment
        }];
        const newFoto = {
            ...this.state.foto,
            comentarios
        };

        this.setState({newComment: '',foto: newFoto});
        this.commentIn.clear();
    }


    render() {


        const {foto} = this.state;

        const showLikes = (likers) => {

            if(likers.length==0) return;

            return  (
                <View style={styles.interactions}>
                    <Text style={styles.likes}>{likers.length} curtida{likers.length>1 && 's'}</Text>
                </View>
            )
        };

        const showTitle = (foto) =>{

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
                <View style={styles.likeContainer}>
                    <TouchableOpacity onPress={(e) => this.handleLike(e)}>
                        <Image style={styles.likeButton} source={this.getLikeImage(foto.likeada)}/>
                    </TouchableOpacity>

                    {showLikes(foto.likers)}
                    {showTitle(foto)}
                    {showComments(foto)}

                    <View style={styles.newComment}>
                        <TextInput
                            placeHolder="Adicione um comentário..."
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            ref={input => this.commentIn = input}
                            onChangeText={text => this.setState({newComment: text})}
                        />
                        <TouchableOpacity onPress={this.addComment.bind(this)}>
                            <Image source={sendImage} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>

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
    likeContainer: {
        margin: 10
    },
    likeButton: {
        width: 40,
        height: 40
    },
    interactions:{
    },
    likes:{
        fontWeight: 'bold'

    },
    title: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    titleUsername:{
        marginRight: 5,
        fontWeight: 'bold'
    },
    titleUserMessage:{},
    comments: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#eee'
    },
    commentUsername:{
        marginRight: 5,
        fontWeight: 'bold'
    },
    commentUserMessage:{},
    newComment:{
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