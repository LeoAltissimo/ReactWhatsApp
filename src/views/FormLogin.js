import React from 'react';

import { connect } from 'react-redux';
import * as authActions from '../redux/auth/authActions';

import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

const formLoginBackground = require('../../assets/imgs/formLoginBackground.jpg');

class FormLogin extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps(props) {
    if(!props.loginActionLoading && props.loginStatus ) {
      navigation.navigate('TabMain');
    }
  }

  clearTextIfIsDefault(filed = null) {
    if (!filed)
      return false;
      
    switch (filed) {
      case 'email':
        if (this.props.email === 'E-mail')
          this.props.setEmailLogin('');
        break;

      case 'password':
        if (this.props.password === 'Senha')
          this.props.setPasswordLogin('');
        break;

      default:
        return false;
    }
  }

  checkTextIsNull(filed = null) {
    if (!filed)
      return false;

    switch (filed) {
      case 'email':
        if (this.props.email === '')
          this.props.setEmailLogin();
        break;

      case 'password':
        if (this.props.password === '')
          this.props.setPasswordLogin();
        break;

      default:
        return false;
    }
  }

  setText(filed = null, value = '') {
    if (!filed)
      return false;

    switch (filed) {
      case 'email':
          this.props.setEmailLogin(value);
        break;

      case 'password':
          this.props.setPasswordLogin(value);
        break;

      default:
        return false;
    }
  }

  sendLogin() {
    const { email, password, makeLogin } = this.props;
    makeLogin(email, password);
  }

  render() {
    const {
      loginError,
      loginErrorMsg
    } = this.props;

    return (
      <ImageBackground
        source={formLoginBackground}
        style={styles.container}
      >
        {/* header */}
        <View style={styles.containerTitle}>
          <Text style={styles.title}>
            WhatsApp Teste
          </Text>
        </View>

        {/* Login form */}
        <View style={styles.containerForm}>
          <TextInput
            style={styles.campoLogin}
            value={this.props.email}
            textContentType={'emailAddress'}
            autoComplete="email"
            autoCapitalize="none"
            keyboardType="email-address"
            onFocus={() => this.clearTextIfIsDefault('email')}
            onChangeText={(text) => this.setText('email', text)}
            onEndEditing={() => this.checkTextIsNull('email')}
          />
          <TextInput
            style={styles.campoLogin}
            value={this.props.password}
            textContentType={'password'}
            secureTextEntry={!this.props.showPassword}
            onFocus={() => this.clearTextIfIsDefault('password')}
            onChangeText={(text) => this.setText('password', text)}
            onEndEditing={() => this.checkTextIsNull('password')}
          />

          {/* Login Error Mensage */}
          {loginError &&
            <Text style={styles.errorMenssage}>{loginErrorMsg}</Text>
          }

          {/* Link to SingUp */}
          <TouchableOpacity
            onPress={() => (this.props.navigation.navigate('FormCadastro'))}
          >
            <Text style={styles.linkCadastro}>
              Ainda nao tem cadastro? Cadastre-se!
            </Text>
          </TouchableOpacity>

        </View>

        {/* Login Button */}
        <View style={styles.containerButton}>
          <Button
            title='Entrar'
            color='#287f62'
            onPress={() => this.sendLogin()}
          />
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // header style
  containerTitle: {
    flex: 4,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },

  // LoginForm Style
  containerForm: {
    flex: 5,
    justifyContent: 'center',
  },
  linkCadastro: {
    color: '#fff',
    fontSize: 14
  },
  campoLogin: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 300,
    marginVertical: 20
  },
  errorMenssage: {
    color: '#ff0000',
    fontSize: 14
  },

  // buttonLogin Style
  containerButton: {
    flex: 3,
    width: '90%',
    justifyContent: 'flex-start',
  }
});

const mapStateTopProps = store => ({
  email: store.AuthReducer.email,
  password: store.AuthReducer.password,
  showPassword: store.AuthReducer.showPassword,
  loginActionLoading: store.AuthReducer.loginActionLoading,
  loginStatus: store.AuthReducer.loginStatus,
  loginError: store.AuthReducer.loginError,
  loginErrorMsg: store.AuthReducer.loginErrorMsg
});

const mapDispathcToPropos = {
  ...authActions
};

const ConnectedFormLogin = connect(mapStateTopProps, mapDispathcToPropos)(FormLogin);

export { ConnectedFormLogin }