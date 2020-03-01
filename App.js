import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { StackNavigation } from './src/Routes/Routes';
import store from './src/redux';


export default class App extends Component {
  componentWillMount(){
    var config = {

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

