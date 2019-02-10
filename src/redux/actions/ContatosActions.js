import firebase from 'firebase';
import b64 from 'base-64';

import {
    SET_EMAIL_TO_ADD,
    SET_LISTA_CONTATOS,
    initialState
} from '../reducers/ContatosReducer';

export function setEmailTopAdd( emailToAdd ){
    return ({ type: SET_EMAIL_TO_ADD, payload: { setEmailTopAdd: emailToAdd } });
}


export const clearTextIfIsDefault = (text) => {

    if( text === initialState.emailToAdd )
        text = '';

    return ({
        type: SET_EMAIL_TO_ADD,
        payload: {
            setEmailTopAdd: text,
        }
    });
};

export function reloadListaContatos(userEmail){
    uidUser = b64.encode( userEmail );

    return DISPATCH => {
        firebase.database().ref(`usuario/${uidUser}/contatos`).once('value')
        .then( query => {  
            if( (query.exists( )) )
                DISPATCH({ type: SET_LISTA_CONTATOS, payload: { contatos: Object.values(query.val()) } });
            else
                DISPATCH({ type: SET_LISTA_CONTATOS, payload: { contatos: null } });
        });
    };
}

export function atualizaListaContatos( contatosObj ){
    return({ type: SET_LISTA_CONTATOS, payload: { contatos: contatosObj } });
} 