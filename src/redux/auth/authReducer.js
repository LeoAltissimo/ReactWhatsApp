export const initialState = {
  // login
  email: 'E-mail',
  password: 'password',
  loginActionLoading: false,
  showPassword: true,
  loginError: false,
  loginErrorMsg: null,
  loginStatus: false,
  // signup
  name: 'name',
  signupActionLoading: false,
  signupError: false,
  signupErrorMsg: null
}

export default function reducer(State = initialState, action) {
  switch (action.type) {
    // login
    case "AUTH_SET_EMAIL_LOGIN":
      return {
        ...State,
        email:
          action.payload
      };

    case "AUTH_SET_PASSWORD_LOGIN":
      return {
        ...State,
        password: action.payload.text,
        showPassword: Boolean(initialState.password === action.payload.text)
      };

    case "ATUH_LOGIN_LOADING":
      return {
        loginActionLoading: true
      };

    case "AUTH_LOGIN_ERROR":
      return {
        ...State,
        loginActionLoading: false,
        loginError: true,
        loginErrorMsg: action.payload.CodeErro
      };

    case "AUTH_LOGIN_SUCCESS":
      return {
        ...State,
        loginActionLoading: false,
        loginError: false,
        loginErrorMsg: null,
        loginStatus: true
      };

    // signup
    case "AUTH_SET_NAME_SIGNUP":
      return {
        ...State,
        name: action.payload.text
      };

    case "ATUH_SIGNUP_LOADING":
      return {
        signupActionLoading: true
      };

    case "AUTH_SIGNUP_ERROR":
      return {
        ...State,
        signupActionLoading: false,
        signupError: true,
        signupErrorMsg: action.payload.CodeErro
      };

    case "AUTH_SIGNUP_SUCCESS":
      return {
        ...State,
        signupActionLoading: false,
        signupError: false,
        signupErrorMsg: null
      };

    default:
      return State;
  }
}