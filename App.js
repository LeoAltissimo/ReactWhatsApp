import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { StackNavigation } from './src/Routes/Routes';
import store from './src/redux/reducers';


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

