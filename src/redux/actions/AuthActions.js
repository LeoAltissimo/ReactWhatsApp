import firebase from 'firebase';
import b64 from 'base-64';

import {
    SET_EMAIL_LOGIN, 
    SET_SENHA_LOGIN, 
    SET_NOME_CADASTRO,
    ERRO_CADASTRO,
    SUCESSO_CADASTRO,
    ERRO_LOGIN,
    SUCESSO_LOGIN,
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
            text: text,
            apresentasenha: false
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
                text: '',
                apresentasenha: false
            }
        });
    else
        return ({
            type: selectConstType(value),
            payload: {
                text,
                apresentasenha: false
            }
        });
};

// Action verifica se a variavel alvo for vazia, preenche com o inital State
// @value nome da variavel alvo dentro da store
// @text  O atual conteudo da variavel alvo
export const checkTextIsNull = ( value, text ) => {
    let initialvalue = selectInitalState(value);
    let apresentaSenha = false;

    if( text === '' ){
        text = initialvalue;
        apresentaSenha = true
    }

    return ({
        type: selectConstType(value),
        payload: {
            text,
            apresentaSenha
        }
    });
};

// Action dispara requisição para CADSTRO usuário (EMAIL / SENHA) no
// Firebase. esperando uma promisse de sucesso ou erro 
// @email string contendo o email para cadastro
// @senha String contendo a senha para cadastro
// @navigation, objeto de navegação do react-navigation
export const realizaCadastro = ( email, senha, nome, navigation ) => {
    return DISPATCH => {
        firebase.auth().createUserWithEmailAndPassword( email, senha )
            .then( () => { cadastroSucesso(DISPATCH, navigation, nome, email) } )
            .catch( error => { cadatroFalhou(DISPATCH, error.code) } );
    };
}

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o cadastro tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @navigation, objeto de navegação do react-navigation
const cadastroSucesso = ( DISPATCH, navigation, nome, email ) => {
    idUser = b64.encode( email );
    console.log(idUser);
    firebase.database().ref(`usuario/${idUser}`)
        .set({ nome })
        .then( () => {  
            navigation.goBack();
            DISPATCH({ type: SUCESSO_CADASTRO }); 
        } );
};

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o cadastro NÃO tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @CodeErro o codigo de erro produzido pela requisição
const cadatroFalhou = (DISPATCH, CodeErro) => (
    DISPATCH({ type: ERRO_CADASTRO, payload: { CodeErro } })
);

// Action dispara requisição para LOGIN usuário (EMAIL / SENHA) no
// Firebase. esperando uma promisse de sucesso ou erro 
// @email string contendo o email para cadastro
// @senha String contendo a senha para cadastro
// @navigation, objeto de navegação do react-navigation
export const realizaLogin = ( email, senha, navigation ) => {
    return DISPATCH => {
        firebase.auth().signInWithEmailAndPassword( email, senha )
            .then( () => { loginSucesso( DISPATCH, navigation ) } )
            .catch( error => { loginFalhou(DISPATCH, error.code) } );
    };
}

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o LOGIN tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @navigation, objeto de navegação do react-navigation
const loginSucesso = ( DISPATCH, navigation ) => {
    navigation.navigate('TabMain');
    DISPATCH({ type: SUCESSO_LOGIN });
};

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o LOGIN NÃO tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @CodeErro o codigo de erro produzido pela requisição
const loginFalhou = (DISPATCH, CodeErro) => (
    DISPATCH({ type: ERRO_LOGIN, payload: { CodeErro } })
);