import AsyncStorage from '@react-native-community/async-storage';

const API_URI = `https://instalura-api.herokuapp.com/api`;

export default class InstaluraFetchService {


    static getLoggedUser() {
        return AsyncStorage.getItem('login');
    }

    static getToken() {
        return AsyncStorage.getItem('token');
    }

    static get(resource) {
        const uri = `${API_URI}${resource}`;

        return AsyncStorage.getItem('token')
            .then(token => {
                const config = {
                    headers: new Headers({
                        'X-AUTH-TOKEN': token
                    }),
                    method: 'GET',
                };
                return config;
            })
            .then(config => fetch(uri, config))
            .then(resposta => resposta.json())
    }

    static post(resource, data) {
        const uri = `${API_URI}${resource}`;

        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    headers: new Headers({
                        'X-AUTH-TOKEN': token,
                        'Content-type': 'application/json'
                    }),
                    method: 'POST',
                    body: data
                };
            })
            .then(config => fetch(uri, config))
            .then(resposta => resposta.json())
    }

}