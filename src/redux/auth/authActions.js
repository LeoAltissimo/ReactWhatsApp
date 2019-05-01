import authAPI from "../../services/auth";
import b64 from 'base-64';

// set value of login/signup email field
// @value string new value of login/signup email
export const setEmailLogin = (value) => {
  return { type: "AUTH_SET_EMAIL_LOGIN", payload: value }
}

// set value of login/signup password field
// @value string new value of login/signup password
export const setPasswordLLogin = (value) => {
  return { type: "AUTH_SET_PASSWORD_LOGIN", payload: value }
}

// Action wait the promise to LOGIN (EMAIL / password) on FirebaseAPI
// @email string with email of user
// @password String with password of user
export const makeLogin = (email, password, navigation) => async dispatch => {
  dispatch({ type: "ATUH_LOGIN_LOADING" })

  authAPI.authLogin({ email, password })
    .then(() => {
      navigation.navigate('TabMain');
      dispatch({ type: "AUTH_LOGIN_SUCCESS" })
    })
    .catch((err) => {
      dispatch({ type: "AUTH_LOGIN_ERROR", payload: { err } })
    })
}

// set value od name field of signup
// @value new value of name fiel
export const setNameSignup = (value) => {
  return { type: "AUTH_SET_NAME_SIGNUP", payload: value }
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