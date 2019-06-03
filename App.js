/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet} from 'react-native';
import Post from './src/components/Post'

type Props = {};


const screen = Dimensions.get('screen');
const {width, height} = screen;
const marginTop = Platform.OS === 'ios' ? 20 : 0;

const headers = new Headers();
headers.append('Content-Type', 'text/plain');
const requestConfig = {
    headers,
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};
const request = new Request('https://instalura-api.herokuapp.com/api/public/fotos/rafael', requestConfig);

export default class App extends Component<Props> {

    constructor(props) {
        super();
        this.state = {
            fotos: []
        }
    }

    componentDidMount() {
        fetch(request)
            .then(resposta => resposta.json())
            .then(json => {
                const comentarios = [
                    {login: 'dobradordevigas', 'texto': 'foi u câum qui butô pa nois bebê', id: 0},
                    {login: 'amaciadordebigornas', 'texto': 'show de bolinha', id: 1},
                    {login: 'enroladordevergalhoes', 'texto': 'já matei mais de mil', id: 2},
                ];
                let fotos = [...json];
                fotos[0].comentarios.length===0 ? fotos[0].comentarios = [...comentarios]: fotos[0].comentarios;
                this.setState({fotos})
            })
    }

    like(id) {
        let foto = this.state.fotos.find(f => f.id === id);
        let likers = foto.likers || [];
        if (!foto.likeada) {
            likers.push({'nome': 'teste', 'login': 'teste'})
        } else {
            likers = likers.filter(liker => {
                return liker.login !== 'teste';
            });
        }
        const newFoto = {
            ...foto,
            likeada: !foto.likeada,
            likers
        };
        const fotos = this.state.fotos.map(f => f.id === newFoto.id ? newFoto : f); //mapeando um novo array de fotos
        this.setState({fotos});//atualizando fotos
    }


    addComment(id, newComment, commentIn) {

        if (!newComment || newComment.length === 0) return;
        const foto = this.state.fotos.find(f => f.id === id);

        const comentarios = [...foto.comentarios, {
            'id': parseInt(Math.random() * 1000),
            'login': 'encantadordeestatuas',
            'texto': newComment
        }];
        const newFoto = {
            ...foto,
            comentarios
        };
        //this.setState({foto: newFoto});
        const fotos = this.state.fotos.map(f => newFoto.id === f.id ? newFoto : f);
        this.setState({fotos});
        commentIn.clear();
    }

    render() {
        return (
            <FlatList
                style={styles.container}
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

const styles = StyleSheet.create({
    container: {
        marginTop,
        width,
        height
    }
});
