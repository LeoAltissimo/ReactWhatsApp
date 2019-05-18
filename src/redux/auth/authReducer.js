export const initialState = {
  // login
  email: 'E-mail',
  password: 'Senha',
  loginActionLoading: false,
  showPassword: true,
  loginError: false,
  loginErrorMsg: null,
  loginStatus: false,
  // signup
  name: 'Nome',
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
        email: action.payload
      };

    case "AUTH_RESET_EMAIL_LOGIN":
      return {
        ...State,
        email: initialState.email
      };

    case "AUTH_SET_PASSWORD_LOGIN":
      return {
        ...State,
        password: action.payload,
        showPassword: Boolean(initialState.password === action.payload)
      };

    case "AUTH_RESET_PASSWORD_LOGIN":
      return {
        ...State,
        password: initialState.password,
        showPassword: true
      };

    case "ATUH_LOGIN_LOADING":
      return {
        loginActionLoading: true
      };

    case "AUTH_LOGIN_ERROR":
      return {
        ...State,
        email: initialState.email,
        password: initialState.password,
        loginActionLoading: false,
        loginError: true,
        loginErrorMsg: action.payload
      };

    case "AUTH_LOGIN_SUCCESS":
      return {
        ...State,
        loginActionLoading: false,
        loginError: false,
        loginErrorMsg: null,
        loginStatus: true
      };
    
    case "AUTH_SET_LOGIN_STATUS":
      return {
        ...State,
        loginStatus: action.payload,
      }

    // signup
    case "AUTH_SET_NAME_SIGNUP":
      return {
        ...State,
        name: action.payload
      };

    case "AUTH_RESET_NAME_SIGNUP":
      return {
        ...State,
        name: initialState.name
      };

    case "AUTH_SIGNUP_LOADING":
      return {
        ...State,
        signupActionLoading: true
      };

    case "AUTH_SIGNUP_ERROR":
      return {
        ...State,
        signupActionLoading: false,
        signupError: true,
        signupErrorMsg: action.payload
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