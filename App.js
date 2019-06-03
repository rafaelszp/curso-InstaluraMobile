/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet,Platform} from 'react-native';
import Post from './src/components/Post'

type Props = {};


const screen = Dimensions.get('screen');
const {width, height} = screen;
const marginTop = Platform.OS === 'ios' ? 20 : 0;

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
        marginTop,
        width,
        height
    }
});
