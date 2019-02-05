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

export function atualizaListaContatos( contatosObj ){
    return({ type: SET_LISTA_CONTATOS, payload: { contatos: contatosObj } });
} 