import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const unlikedImage = require('../resources/images/s2.png');
const likedImage = require('../resources/images/s2-checked.png');

export default class Like extends Component {

    render() {

        const {foto,likeCallback} = this.props;

        const getLikeImage = (likeada) => {
            return likeada ? likedImage : unlikedImage
        };

        const showLikes = (likers) => {

            if(likers.length===0) return;

            return  (
                <View style={styles.interactions}>
                    <Text style={styles.likes}>{likers.length} curtida{likers.length>1 && 's'}</Text>
                </View>
            )
        };



        return (
            <React.Fragment>
                <TouchableOpacity onPress={likeCallback}>
                    <Image style={styles.likeButton} source={getLikeImage(foto.likeada)}/>
                </TouchableOpacity>

                {showLikes(foto.likers)}

            </React.Fragment>
        );
    }


}

const styles = StyleSheet.create({

    likeButton: {
        width: 40,
        height: 40
    },
    interactions:{
    },
    likes:{
        fontWeight: 'bold'

    },
});