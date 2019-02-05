export const SET_EMAIL_TO_ADD = 'set_email_to_add';
export const SET_LISTA_CONTATOS = 'set_lista_contatos';

export const initialState = {
    emailToAdd: 'E-mail',
}

export default function reducer( State = initialState, action ) {
    switch( action.type ) {
        case SET_EMAIL_TO_ADD:
            return { ...State, emailToAdd: action.payload.setEmailTopAdd }
        case SET_LISTA_CONTATOS:
            return { ...State, contatos: action.payload.contatos }
        default:
            return State;
    }
}