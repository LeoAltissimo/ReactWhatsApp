import firebase from 'firebase';
import b64 from 'base-64';

import {
    SET_EMAIL_TO_ADD,
    SET_LISTA_CONTATOS,
    initialState
} from '../reducers/ContatosReducer';

// Action que seta um novo valor para o campo de busca de email
// @emailToAdd email a ser adicionado na lista de contatos
export function setEmailTopAdd( emailToAdd ){
    return ({ type: SET_EMAIL_TO_ADD, payload: { setEmailTopAdd: emailToAdd } });
}

// Action que lipa o campo de busca de email
// @text o conteudo presente no campo
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

// Action atualuiza a lista de contatos existentes em um usuario
// @userEmail o email do usuário atual para realizar a query de contatos
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