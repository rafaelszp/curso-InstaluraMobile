/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, YellowBox} from 'react-native';
import Post from '../components/Post'
import AsyncStorage from '@react-native-community/async-storage';

YellowBox.ignoreWarnings(['Require cycle:']);

type Props = {};


// const screen = Dimensions.get('screen');
// const {width, height} = screen;
// const marginTop = Platform.OS === 'ios' ? 0 : 0;


//Caso o serviço esteja em localhost é preciso utilizar o IP 10.0.2.2 para o serviço de testes, pois o android
//interpreta localhost como endereço do dispositivo móvel
// const request = new Request('https://instalura-api.herokuapp.com/api/public/fotos/rafael', requestConfig);

const API_URI = `https://instalura-api.herokuapp.com/api`;

export default class Feed extends Component<Props> {

    constructor(props) {
        super();
        this.state = {
            fotos: [],
            login: '',
            token: ''
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    async _fetchData() {
        const login = await AsyncStorage.getItem('login');
        this.setState({login});
        const token = await AsyncStorage.getItem('token');
        this.setState({token})
        this._refreshFeed()
    }


    async _refreshFeed() {
        const uri = `${API_URI}/fotos`;
        const config = {
            headers: new Headers({
                'X-AUTH-TOKEN': this.state.token
            }),
            method: 'GET',
        };

        fetch(uri, config)
            .then(resposta => resposta.json())
            .then(json => {
                const comentarios = [
                    {login: 'dobradordevigas', 'texto': 'foi u câum qui butô pa nois bebê', id: 0},
                    {login: 'amaciadordebigornas', 'texto': 'show de bolinha', id: 1},
                    {login: 'enroladordevergalhoes', 'texto': 'já matei mais de mil', id: 2},
                ];
                let fotos = [...json];
                fotos[0].comentarios.length === 0 ? fotos[0].comentarios = [...comentarios] : fotos[0].comentarios;
                this.setState({fotos})
            });
    }

    like(id) {

        const uri = `${API_URI}/fotos/${id}/like`;
        const config = {
            headers: new Headers({
                'X-AUTH-TOKEN': this.state.token
            }),
            method: 'POST',
        };
        fetch(uri, config)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw new Error('Erro ao realizar like')
            }).then(() => {
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
        });

    }


    addComment(id, newComment, commentIn) {

        if (!newComment || newComment.length === 0) return;

        const uri = `${API_URI}/fotos/${id}/comment`;

        const config = {
            headers: new Headers({
                'X-AUTH-TOKEN': this.state.token,
                'Content-type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({
                texto: newComment
            })
        };
        fetch(uri,config)
            .then(response=>{
                if(response.ok) return response.json();
                throw new Error('Erro ao comentar')
            })
            .then(comentario =>{
                const foto = this.state.fotos.find(f => f.id === id);

                const comentarios = [...foto.comentarios, comentario];
                const newFoto = {
                    ...foto,
                    comentarios
                };
                const fotos = this.state.fotos.map(f => newFoto.id === f.id ? newFoto : f);
                this.setState({fotos});
                commentIn.clear();
            });

    }

    render() {
        if (this.state.token.length === 0) return (null);
        return (
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={this.state.fotos}
                renderItem={({item}) =>
                    <Post foto={item}
                          likeCallback={this.like.bind(this)}
                          commentCallback={this.addComment.bind(this)}
                    />
                }
            />
        );
    }
}

