import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import b64 from 'base-64';

/**
 * Summary: Set value of login/signup email field
 * @param {String} value | New value to login/signup email
 */
export const setEmailLogin = (value = null) => {
  if (value !== null)
    return { type: "AUTH_SET_EMAIL_LOGIN", payload: value }
  else
    return { type: "AUTH_RESET_EMAIL_LOGIN" }
}

/**
 * Summary: Set value of login/signup password field
 * @param {String} value | New value to login/signup password
 */
export const setPasswordLogin = (value = null) => {
  if (value !== null)
    return { type: "AUTH_SET_PASSWORD_LOGIN", payload: value }
  else
    return { type: "AUTH_RESET_PASSWORD_LOGIN" }
}

/**
 * Summary: Action wait the promise to LOGIN (EMAIL / password) on FirebaseAPI
 * @param {String} email    | email of user
 * @param {String} password | password of user
 */
export const makeLogin = (email, password) => async dispatch => {
  dispatch({ type: "ATUH_LOGIN_LOADING" })

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      try {
        AsyncStorage.setItem('loginStatus', 'true');
        AsyncStorage.setItem('emailUser', email);

        dispatch({ type: "AUTH_LOGIN_SUCCESS" });
      } catch (error) {
        console.log(error);
      }
    })
    .catch(err => {
      let errorMsg = '';

      switch (err.code) {
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

/**
 * Summary: Set the login status get of local storage
 * @param {Boolean} status | login status
 */
export const setLogin = (status) => dispatch => {
  dispatch({type: "AUTH_SET_LOGIN_STATUS", payload: status});
}

/**
 * Summary: Set value od name field of signup
 * @param {String} value | New value to name fiel
 */
export const setNameSignup = (value = null) => {
  if (value !== null)
    return { type: "AUTH_SET_NAME_SIGNUP", payload: value }
  else
    return { type: "AUTH_RESET_NAME_SIGNUP" }
}

/**
 * Summary: Make signup of new user on FirebaseAPI
 * @param {String} email    | E-mail of new user
 * @param {String} password | Password of new user
 * @param {String} name     | Complete name of new user
 */
export const makeSignup = (email, password, name) => async dispatch => {
  dispatch({ type: "AUTH_SIGNUP_LOADING" })

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      let idUser = b64.encode(email);

      firebase.database().ref(`user/${idUser}`).set({ name })
        .then(() => dispatch({ type: "AUTH_SIGNUP_SUCCESS" }))
        .catch(err => {
          let errorMsg = 'Erro ao cadastrar o usuário.';
          dispatch({ type: "AUTH_SIGNUP_ERROR", payload: errorMsg })
        })
    })
    .catch(err => {
      let errorMsg = '';

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMsg = "E-mail já esta em uso";
          break;
        case "auth/invalid-email":
          errorMsg = "E-mail inválido";
          break;
        case "auth/operation-not-allowed":
          errorMsg = "Cadastro não permitido";
          break;
        case "auth/weak-password":
          errorMsg = "Escolha um senha mais dificíl.";
          break;
      }

      dispatch({ type: "AUTH_SIGNUP_ERROR", payload: errorMsg })
    })
}