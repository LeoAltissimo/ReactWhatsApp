export const SET_EMAIL_TO_ADD = 'set_email_to_add';

export const initialState = {
    emailToAdd: 'E-mail',
}

export default function reducer( State = initialState, action ) {
    switch( action.type ) {
        case SET_EMAIL_TO_ADD:
            return { ...State, emailToAdd: action.payload.emailToAdd }
        default:
            return State;
    }
}