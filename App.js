import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';

import reducers from './src/redux/reducers/';

//Views Import
import { 
  FormLogin, 
  FormCadastro,
  TabMain
} from './src/views';

// Seting Redux
const store = createStore( reducers, applyMiddleware(thunk) );

// Seting React-Navigation
const rotas = createStackNavigator({
  FormLogin: FormLogin,
  FormCadastro: FormCadastro,
  TabMain: TabMain
},
{
  initialRouteName: 'FormLogin',
  headerMode: 'none'
});
const StackNavigation = createAppContainer(rotas);


export default class App extends Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyDKbyJEvK5TGK8TXsRM7Qu8bLiNonTYhJg",
      authDomain: "wahtsapp-clone-b02d6.firebaseapp.com",
      databaseURL: "https://wahtsapp-clone-b02d6.firebaseio.com",
      projectId: "wahtsapp-clone-b02d6",
      storageBucket: "wahtsapp-clone-b02d6.appspot.com",
      messagingSenderId: "626481488736"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    );
  }
}

