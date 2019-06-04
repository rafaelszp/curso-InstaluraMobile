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

import InstaluraFetchService from '../services/InstaluraFetchService'

YellowBox.ignoreWarnings(['Require cycle:']);

type Props = {};


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
        InstaluraFetchService.getLoggedUser().then(login => this.setState({login}));
        InstaluraFetchService.getToken().then(token => this.setState({token}));
        InstaluraFetchService.get('/fotos').then(fotos => this.setState({fotos}));
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

