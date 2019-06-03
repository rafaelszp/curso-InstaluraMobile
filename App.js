/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import Post from './src/components/Post'

type Props = {};


const screen = Dimensions.get('screen');
const {width, height} = screen;

const fotos = [
    {id: 1, name: 'rafael'},
    {id: 2, name: 'keyla'},
    {id: 3, name: 'maria'},
    {id: 4, name: 'joaquim'},
    {id: 5, name: 'paulo henrique'},
    {id: 6, name: 'cleide'},
    {id: 7, name: 'edinaldo'},
    {id: 8, name: 'valdeci'},
    {id: 9, name: 'hellen'},
];

const headers = new Headers();
headers.append('Content-Type','text/plain');
const requestConfig = {
    headers,
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};
const request = new Request('https://instalura-api.herokuapp.com/api/public/fotos/rafael',requestConfig);

export default class App extends Component<Props> {

    constructor(props){
        super();
        this.state ={
            fotos: []
        }
    }

    componentDidMount() {
        fetch(request)
            .then(resposta => resposta.json())
            .then(json => this.setState({fotos: json}))
    }

    render() {
        return (
            <FlatList
                style={styles.container}
                keyExtractor={item => item.id.toString()}
                data={this.state.fotos}
                renderItem={({item}) =>
                    <Post foto={item}/>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height
    }
});
