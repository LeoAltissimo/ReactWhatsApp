import {
    SET_EMAIL_TO_ADD
} from '../reducers/ContatosReducer';

export function setEmailTopAdd( text ){
    return ({ type: SET_EMAIL_TO_ADD, payload: { setEmailTopAdd: text } });
}