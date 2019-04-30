export const initialState = {
  name: 'name',
  email: 'E-mail',
  password: 'password',
  showPassword: true,
  signupError: false,
  loginError: false,
  loginStatus: false
}

export default function reducer(State = initialState, action) {
  switch (action.type) {
    // login
    case "AUTH_SET_EMAIL_LOGIN":
      return { ...State, email: action.payload.text };
    case "AUTH_SET_PASSWORD_LOGIN":
      return {
        ...State,
        password: action.payload.text,
        showPassword: action.payload.showPassword
      };
      
    case "AUTH_LOGIN_ERROR":
      return {
        ...State,
        loginError: true,
        typeloginError: action.payload.CodeErro
      }
    case "AUTH_LOGIN_SUCCESS":
      return { ...State, loginError: false, loginStatus: true }

    // signup
    case "AUTH_SET_NAME_SIGNUP":
      return { ...State, name: action.payload.text };
    case "AUTH_SIGNUP_ERROR":
      return { ...State, signupError: true, typesignupError: action.payload.CodeErro }
    case "AUTH_SIGNUP_SUCCESS":
      return { ...State, signupError: false }

    default:
      return State;
  }
}