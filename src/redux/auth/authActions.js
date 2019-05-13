import authAPI from "../../services/auth";
import firebase from 'firebase';
import b64 from 'base-64';

// set value of login/signup email field
// @value string new value of login/signup email
export const setEmailLogin = (value = null) => {
  if (value !== null)
    return { type: "AUTH_SET_EMAIL_LOGIN", payload: value }
  else
    return { type: "AUTH_RESET_EMAIL_LOGIN" }
}

// set value of login/signup password field
// @value string new value of login/signup password
export const setPasswordLogin = (value = null) => {
  if (value !== null)
    return { type: "AUTH_SET_PASSWORD_LOGIN", payload: value }
  else
    return { type: "AUTH_RESET_PASSWORD_LOGIN" }
}

// Action wait the promise to LOGIN (EMAIL / password) on FirebaseAPI
// @email string with email of user
// @password String with password of user
export const makeLogin = (email, password) => async dispatch => {
  dispatch({ type: "ATUH_LOGIN_LOADING" })

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() =>   dispatch({ type: "AUTH_LOGIN_SUCCESS" }))
  .catch(err => {
    let errorMsg = '';

    switch( err.code ) {
      case "auth/invalid-email":
        errorMsg = "E-mail inválido";
        break;
      case "auth/user-disabled":
        errorMsg = "Usuário desativado";
        break;
      case "auth/user-not-found":
        errorMsg = "Usuário não encontrado";
        break;
      case "auth/wrong-password":
        errorMsg = "Senha incorreta";
        break;
    }
    dispatch({ type: "AUTH_LOGIN_ERROR", payload: errorMsg })
  })
}

// set value od name field of signup
// @value new value of name fiel
export const setNameSignup = (value) => {
  if (valeu)
    return { type: "AUTH_SET_NAME_SIGNUP", payload: value }
  else
    return { type: "AUTH_RESET_NAME_SIGNUP" }
}

// Make signup of new user
// await promisse to signup on FirebaseAPI
// @email string with email of new user
// @password string with password of new user
// @name string with complete name of new user
export const makeSignup = (email, password, name) => async dispatch => {
  dispatch({ type: "AUTH_SIGNUP_LOADING" })

  authAPI.authSignup({ email, password })
    .then(() => {
      authAPI.authPostNewUser({ idUser: b64.encode(email), name })
        .then(() => dispatch({ type: "AUTH_SIGNUP_SUCCESS" }))
        .catch(err => dispatch({ type: "AUTH_SIGNUP_ERROR", payload: err }))
    })
    .catch(err => dispatch({ type: "AUTH_SIGNUP_ERROR", payload: err }))
}