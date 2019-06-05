/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, YellowBox,ScrollView} from 'react-native';
import Post from '../components/Post'
import { NavigationEvents } from 'react-navigation';

import Notification from '../util/Notification'
import HeaderUsuario from '../components/HeaderUsuario'

import InstaluraFetchService from '../services/InstaluraFetchService'

YellowBox.ignoreWarnings(['Require cycle:']);



export default class Feed extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('login', 'Instalura'),
            headerStyle: styles.header,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 16,
                textAlign:"center",
                flex:1,
            },

        };
    };

    constructor() {
        super();
        this.state = {
            fotos: [],
            login: '',
            token: '',
            status: 'OK'
        }
    }

    componentDidMount() {
        InstaluraFetchService.getLoggedUser().then(login => this.setState({login}));
        InstaluraFetchService.getToken().then(token => this.setState({token}));
        this.load();

    }

    load() {
        this.setState({status:'OK'});

        let resource = '/fotos';
        const profile = this.props.navigation.getParam('login','!@NIL!@');

        if(profile!=='!@NIL!@'){
            resource=`/public/fotos/${profile}`;
            this.props.navigation.setParams({ login: profile });
        }
        InstaluraFetchService.get(resource)
            .then(fotos => this.setState({fotos}))
            .then(() => this.setState({status: 'OK'}))
            .catch(() => this.setState({status: 'FALHA_CARREGAMENTO'}));
    }

    like(id) {

        const res = `/fotos/${id}/like`;
        InstaluraFetchService.post(res)
            .then(() => {
                let foto = this.state.fotos.find(f => f.id === id);
                let likers = foto.likers || [];
                if (!foto.likeada) {
                    likers.push({'nome': '', 'login': this.state.login})
                } else {
                    likers = likers.filter(liker => {
                        return liker.login !== this.state.login;
                    });
                }
                const newFoto = {
                    ...foto,
                    likeada: !foto.likeada,
                    likers
                };
                const fotos = this.state.fotos.map(f => f.id === newFoto.id ? newFoto : f); //mapeando um novo array de fotos
                this.setState({fotos});//atualizando fotos
            })
            .catch(e => Notification.show('Erro!', e.message));

    }


    addComment(id, newComment, commentIn) {

        if (!newComment || newComment.length === 0) return;
        const data = JSON.stringify({texto: newComment});

        InstaluraFetchService.post(`/fotos/${id}/comment`, data)
            .then(comentario => {
                const foto = this.state.fotos.find(f => f.id === id);

                const comentarios = [...foto.comentarios, comentario];
                const newFoto = {
                    ...foto,
                    comentarios
                };
                const fotos = this.state.fotos.map(f => newFoto.id === f.id ? newFoto : f);
                this.setState({fotos});
                commentIn.clear();
            })
            .catch(e => Notification.show('Erro!', e.message));

    }

    showProfile(foto){
        this.props.navigation.navigate('GotoAnotherFeed', {
            login: foto.loginUsuario,
            fotoPerfil: foto.urlPerfil
        });
    }

    exibeTelaFalha() {
        return (
            <TouchableOpacity style={styles.errorContainer} onPress={() => {
                this.load()
            }}>
                <Text style={styles.errorHeader}>Ooops...</Text>
                <Text style={styles.errorText}>Erro inesperado ao carregar o Feed.</Text>
                <Text style={styles.errorText}>Toque aqui para tentar novamente</Text>
            </TouchableOpacity>
        );
    }

    exibeHeaderUsuario(){
        const profile = this.props.navigation.getParam('login','!@NIL!@');
        if(profile && profile!=='!@NIL!@'){
            return (
                <HeaderUsuario posts={this.state.fotos.length} fotoDePerfil={this.props.navigation.getParam('fotoPerfil','')} usuario={this.props.navigation.getParam('login','')}/>
            );
        }else{
            return(null);
        }
    }

    render() {
        if (this.state.token.length === 0) return (null);
        if (this.state.status === 'FALHA_CARREGAMENTO') return this.exibeTelaFalha();
        return (
            <ScrollView>
                <NavigationEvents
                    onDidFocus={payload => {
                        this.load()
                    }}
                />
                {this.exibeHeaderUsuario()}
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={this.state.fotos}
                    renderItem={({item}) =>
                        <Post foto={item}
                              likeCallback={this.like.bind(this)}
                              commentCallback={this.addComment.bind(this)}
                              showProfileCallback={this.showProfile.bind(this)}
                        />
                    }
                />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        borderWidth: 0,
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,// remove shadow on IOS
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#eee"

    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorHeader: {
        fontWeight: 'bold',
        fontSize: 26
    },
    errorText: {
        marginRight: 5,
        marginLeft: 5
    }
});