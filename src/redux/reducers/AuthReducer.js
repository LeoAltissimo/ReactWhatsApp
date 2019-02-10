export const SET_EMAIL_LOGIN = 'set_email_login';
export const SET_SENHA_LOGIN = 'set_senha_login';
export const SET_NOME_CADASTRO = 'set_nome_cadastro';
export const ERRO_CADASTRO =   'Erro_de_cadastro';
export const SUCESSO_CADASTRO = 'Sucesso_no_cadastro';
export const ERRO_LOGIN =   'Erro_de_login';
export const SUCESSO_LOGIN = 'Sucesso_no_login';

export const initialState = {
    nome: 'Nome',
    email: 'tester@tester.com',
    senha: '123456',
    apresentaSenha: true,
    erroCadastro: false,
    erroLogin: false,
    loginStatus: false
}

export default function reducer( State = initialState, action ) {
    switch( action.type ) {
        case SET_EMAIL_LOGIN:
            return { ...State, email: action.payload.text };
        case SET_SENHA_LOGIN:
            return { 
                ...State, 
                senha: action.payload.text,
                apresentaSenha: action.payload.apresentaSenha 
            };
        case SET_NOME_CADASTRO:
            return { ...State, nome: action.payload.text };
        case ERRO_CADASTRO:
            return { ...State, erroCadastro: true, typeErroCadastro: action.payload.CodeErro }
        case SUCESSO_CADASTRO:
            return { ...State, erroCadastro: false }
        case ERRO_LOGIN:
            return { ...State, erroLogin: true, typeErroLogin: action.payload.CodeErro }
        case SUCESSO_LOGIN:
            return { ...State, erroLogin: false, loginStatus: true }
        default:
            return State;
    }
}