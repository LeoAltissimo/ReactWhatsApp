import authAPI from "../../services/auth";

// set value of login/signup email field
// @value new value of login/signup email
export const setEmailLogin = (value) => {
  return { type: "AUTH_SET_EMAIL_LOGIN", payload: value }
}

// set value of login/signup password field
// @value new value of login/signup password
export const setPasswordLLogin = (value) => {
  return { type: "AUTH_SET_PASSWORD_LOGIN", payload: value }
}

// Action dispara requisição para LOGIN usuário (EMAIL / password) no
// Firebase. esperando uma promisse de sucesso ou erro 
// @email string contendo o email para cadastro
// @password String contendo a password para cadastro
// @navigation, objeto de navegação do react-navigation
export const realizaLogin = (email, password, navigation) => {
  const formatedData = { email, password };

  authAPI.authLogin(formatedData)
    .then(() => {
      navigation.navigate('TabMain');
      return { type: "AUTH_LOGIN_SUCCESS" }
    })
    .catch((err) => {
      return { type: "AUTH_LOGIN_ERROR", payload: { err } }
    })
}














// Retorna o type da action Correspondente
// @value string com o name da variavel alvo
function selectConstType(value) {
  switch (value) {
    case 'email':
      return "AUTH_SET_EMAIL_LOGIN";
    case 'password':
      return "AUTH_SET_PASSWORD_LOGIN";
    case 'name':
      return "AUTH_SET_NAME_SIGNUP";
    default:
      return null;
  }
}

// Retorna o valor inicial da variavel alvo
// @value string com o name da variavel alvo
function selectInitalState(value) {
  switch (value) {
    case 'email':
      return initialState.email;
    case 'password':
      return initialState.password;
    case 'name':
      return initialState.name;
    default:
      return null;
  }
}

// Action que seta um novo valor para uma variavel alvo na store
// @value name da variavel alvo dentro da store
// @text  o conteudo que ira sobrescrever o alvo
export const setText = (value, text) => {
  return ({
    type: selectConstType(value),
    payload: {
      text: text,
      apresentapassword: false
    }
  });
};

// Action que lipa a variavel alvo se ela for igual ao inicialState
// @value name da variavel alvo dentro da store
// @text  O atual conteudo da variavel alvo
export const clearTextIfIsDefault = (value, text) => {
  let initialvalue = selectInitalState(value);

  if (text === initialvalue)
    return ({
      type: selectConstType(value),
      payload: {
        text: '',
        apresentapassword: false
      }
    });
  else
    return ({
      type: selectConstType(value),
      payload: {
        text,
        apresentapassword: false
      }
    });
};

// Action verifica se a variavel alvo for vazia, preenche com o inital State
// @value name da variavel alvo dentro da store
// @text  O atual conteudo da variavel alvo
export const checkTextIsNull = (value, text) => {
  let initialvalue = selectInitalState(value);
  let apresentapassword = false;

  if (text === '') {
    text = initialvalue;
    apresentapassword = true
  }

  return ({
    type: selectConstType(value),
    payload: {
      text,
      apresentapassword
    }
  });
};

// Action dispara requisição para CADSTRO usuário (EMAIL / password) no
// Firebase. esperando uma promisse de sucesso ou erro 
// @email string contendo o email para cadastro
// @password String contendo a password para cadastro
// @navigation, objeto de navegação do react-navigation
export const realizaCadastro = (email, password, name, navigation) => {
  return DISPATCH => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { cadastroSucesso(DISPATCH, navigation, name, email) })
      .catch(error => { cadatroFalhou(DISPATCH, error.code) });
  };
}

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o cadastro tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @navigation, objeto de navegação do react-navigation
const cadastroSucesso = (DISPATCH, navigation, name, email) => {
  idUser = b64.encode(email);
  console.log(idUser);
  firebase.database().ref(`usuario/${idUser}`)
    .set({ name })
    .then(() => {
      navigation.goBack();
      DISPATCH({ type: SUCESSO_CADASTRO });
    });
};

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o cadastro NÃO tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @CodeErro o codigo de erro produzido pela requisição
const cadatroFalhou = (DISPATCH, CodeErro) => (
  DISPATCH({ type: ERRO_CADASTRO, payload: { CodeErro } })
);

// Action dispara requisição para LOGIN usuário (EMAIL / password) no
// Firebase. esperando uma promisse de sucesso ou erro 
// @email string contendo o email para cadastro
// @password String contendo a password para cadastro
// @navigation, objeto de navegação do react-navigation
export const realizaLogin = (email, password, navigation) => {
  return DISPATCH => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => { loginSucesso(DISPATCH, navigation) })
      .catch(error => { loginFalhou(DISPATCH, error.code) });
  };
}

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o LOGIN tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @navigation, objeto de navegação do react-navigation
const loginSucesso = (DISPATCH, navigation) => {
  navigation.navigate('TabMain');
  DISPATCH({ type: SUCESSO_LOGIN });
};

// Action usa recorso assincromo do middleware thunk
// dispara a action caso o LOGIN NÃO tenha sido bem sucessido 
// @DISPATCH objeto (Thunk) executa o dispath de forma assincrona
// @CodeErro o codigo de erro produzido pela requisição
const loginFalhou = (DISPATCH, CodeErro) => (
  DISPATCH({ type: ERRO_LOGIN, payload: { CodeErro } })
);