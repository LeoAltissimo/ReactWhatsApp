export const SET_EMAIL_LOGIN = 'set_email_login';
export const SET_SENHA_LOGIN = 'set_senha_login';
export const SET_NOME_CADASTRO = 'set_nome_cadastro';
export const ERRO_CADASTRO =   'Erro_de_cadastro';
export const SUCESSO_CADASTRO = 'Sucesso_no_cadastro';

export const initialState = {
    nome: 'Nome',
    email: 'E-mail',
    senha: 'Senha',
    erroCadastro: false
}

export default function reducer( State = initialState, action ) {
    switch( action.type ) {
        case SET_EMAIL_LOGIN:
            return { ...State, email: action.payload.text };
        case SET_SENHA_LOGIN:
            return { ...State, senha: action.payload.text };
        case SET_NOME_CADASTRO:
            return { ...State, nome: action.payload.text };
        case ERRO_CADASTRO:
            return { ...State, erroCadastro: true, typeErroCadastro: action.payload.CodeErro }
        case SUCESSO_CADASTRO:
            return { ...State, erroCadastro: false }
        default:
            return State;
    }
}