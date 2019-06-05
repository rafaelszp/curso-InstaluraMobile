import AsyncStorage from '@react-native-community/async-storage';

const API_URI = `https://instalura-api.herokuapp.com/api`;

const handleResponse = (response) => {
    if(response.ok)  return response.json();
    throw new Error('Houve um erro ao executar esta operação')
};

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
                return {
                    headers: new Headers({
                        'X-AUTH-TOKEN': token
                    }),
                    method: 'GET',
                };
            })
            .then(config => fetch(uri, config))
            .then(resposta => handleResponse(resposta))
    }

    static post(resource, body) {
        const uri = `${API_URI}${resource}`;

        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    headers: new Headers({
                        'X-AUTH-TOKEN': token,
                        'Content-type': 'application/json'
                    }),
                    method: 'POST',
                    body
                };
            })
            .then(config => fetch(uri, config))
            .then(resposta => handleResponse(resposta))
    }



}