import firebase from 'firebase';

import {
    SET_EMAIL_LOGIN, 
    SET_SENHA_LOGIN, 
    SET_NOME_CADASTRO,
    ERRO_CADASTRO,
    SUCESSO_CADASTRO,
    initialState
} from '../reducers/AuthReducer';

// Retorna o type da action Correspondente
// @value string com o nome da variavel alvo
function selectConstType( value ){
    switch (value){
        case 'email':
            return SET_EMAIL_LOGIN;
        case 'senha':
            return SET_SENHA_LOGIN;
        case 'nome':
            return SET_NOME_CADASTRO;
        default:
            return null;
    }
}

// Retorna o valor inicial da variavel alvo
// @value string com o nome da variavel alvo
function selectInitalState( value ){
    switch (value){
        case 'email':
            return initialState.email;
        case 'senha':
            return initialState.senha;
        case 'nome':
            return initialState.nome;
        default:
            return null;
    }
}

// Action que seta um novo valor para uma variavel alvo na store
// @value nome da variavel alvo dentro da store
// @text  o conteudo que ira sobrescrever o alvo
export const setText = ( value, text ) => {
    return ({
        type: selectConstType(value),
        payload: {
            text: text
        }
    });
};

// Action que lipa a variavel alvo se ela for igual ao inicialState
// @value nome da variavel alvo dentro da store
// @text  O atual conteudo da variavel alvo
export const clearTextIfIsDefault = (value, text) => {
    let initialvalue = selectInitalState(value);
          
    if( text === initialvalue )
        return ({
            type: selectConstType(value),
            payload: {
                text: ''
            }
        });
    else
        return ({
            type: selectConstType(value),
            payload: {
                text
            }
        });
};

// Action verifica se a variavel alvo for vazia, preenche com o inital State
// @value nome da variavel alvo dentro da store
// @text  O atual conteudo da variavel alvo
export const checkTextIsNull = ( value, text ) => {
    let initialvalue = selectInitalState(value);

    if( text === '' )
        text = initialvalue;

    return ({
        type: selectConstType(value),
        payload: {
            text
        }
    });
};

// Action dispara requisição para cadastrar usuário (EMAIL / SENHA) no
// Firebase. esperando uma promisse de sucesso ou erro 
// @value nome da variavel alvo dentro da store
// @text  O atual conteudo da variavel alvo
export const realizaCadastro = ( email, senha ) => {
    return DISPATCH => {
        firebase.auth().createUserWithEmailAndPassword( email, senha )
            .then( () => { cadastroSucesso(DISPATCH) } )
            .catch( error => { cadatroFalhou(DISPATCH, error.code) } );
    };
}

const cadastroSucesso = ( DISPATCH ) => {
    DISPATCH({ type: SUCESSO_CADASTRO });
};

const cadatroFalhou = (DISPATCH, CodeErro) => (
    DISPATCH({ type: ERRO_CADASTRO, payload: { CodeErro } })
);