import React from 'react';
import { 
  View, 
  KeyboardAvoidingView,
  StyleSheet, 
  ImageBackground,
  TextInput,
  Button,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import * as authActions from '../redux/auth/authActions';

const formLoginBackground = require('../../assets/imgs/formLoginBackground.jpg');

class FormSignup extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps(props) {
    if(
        this.props.signupActionLoading === true && 
        props.signupActionLoading === false &&
        props.signupError === false 
      ) {
      this.props.navigation.navigate('TabMain');
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

      case 'name':
        if (this.props.name === 'Nome')
          this.props.setNameSignup('');
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

      case 'name':
        if (this.props.name === '')
          this.props.setNameSignup();
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

      case 'name':
        this.props.setNameSignup(value);
        break;

      default:
        return false;
    }
  }

  sendSingup() {
    const { email, password, name, makeSignup } = this.props;
    makeSignup(email, password, name);
  }

  render() {
    return (
      <ImageBackground
        source={formLoginBackground}
        style={styles.container}
      >
        {/* header */}
        <View style={styles.containerTitle}>
          <Text style={styles.title}>
            Cadastro
          </Text>
        </View>

        {/* Signup form */}
        <KeyboardAvoidingView 
          style={styles.containerForm} 
          behavior="padding"
        >
          <TextInput
            style={styles.fieldSignup}
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
            style={styles.fieldSignup}
            value={this.props.password}
            textContentType={'password'}
            secureTextEntry={!this.props.showPassword}
            onFocus={() => this.clearTextIfIsDefault('password')}
            onChangeText={(text) => this.setText('password', text)}
            onEndEditing={() => this.checkTextIsNull('password')}
          />
          <TextInput
            style={styles.fieldSignup}
            value={this.props.name}
            textContentType={'name'}
            autoCapitalize="words"
            onFocus={() => this.clearTextIfIsDefault('name')}
            onChangeText={(text) => this.setText('name', text)}
            onEndEditing={() => this.checkTextIsNull('name')}
          />
        {/* Login Error Mensage */}
        {this.props.signupError &&
          <Text style={styles.errorMenssage}>
            {this.props.signupErrorMsg}
          </Text>
        }
        </KeyboardAvoidingView>

        {/* Signup Button */}
        <View style={styles.containerButton}>
          <Button 
              title='Cadastrar' 
              color='#FBC02D'
              onPress={ () => this.sendSingup()}
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
    flex: 3,
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
    flex: 6,
    justifyContent: 'center',
  },
  linkSignup: {
    color: '#fff',
    fontSize: 14
  },
  fieldSignup: {
    color: '#3F51B5',
    fontSize: 22,
    fontWeight: '100',
    borderColor: '#3F51B5',
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 10,
    width: 300,
    marginVertical: 5
  },
  errorMenssage: {
    color: '#3F51B5',
    fontSize: 14
  },

  // buttonLogin Style
  containerButton: {
    flex: 3,
    width: '90%',
    justifyContent: 'flex-start',
  }
});

const mapStateToProps = store => ({
  email: store.AuthReducer.email,
  password: store.AuthReducer.password,
  showPassword: store.AuthReducer.showPassword,
  name: store.AuthReducer.name,
  signupActionLoading: store.AuthReducer.signupActionLoading,
  signupError: store.AuthReducer.signupError,
  signupErrorMsg: store.AuthReducer.signupErrorMsg
});

const mapDispatchToProps = {
  ...authActions
};

const ConnectedFormSignup = connect(mapStateToProps, mapDispatchToProps)(FormSignup);

export { ConnectedFormSignup }