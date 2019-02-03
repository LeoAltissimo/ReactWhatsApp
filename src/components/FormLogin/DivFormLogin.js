import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { 
    setText, 
    clearTextIfIsDefault,
    checkTextIsNull
} from '../../redux/actions/AuthActions';

class DivFormLogin extends Component {
    render(){
        if( this.props.erroLogin ){
            let mensagemErro = '';

            switch( this.props.tipoErro ) {
                case 'auth/invalid-email':
                    mensagemErro = 'E-mail inválido';
                    break;
                case "auth/user-disabled":
                    mensagemErro = 'Usuário desativado';
                    break;  
                case 'auth/user-not-found':
                    mensagemErro = 'Usuário não encontrado';
                    break;  
                case 'auth/wrong-password':
                    mensagemErro = 'Senha incorreta';
                    break;  
                default:
                    mensagemErro = 'Erro ao realiar o login';
                    break;
        }

            return(
                <View style={styles.container}>
                    <TextInput 
                        style={styles.campoLogin}
                        value={this.props.email}
                        textContentType={'emailAddress'}
                        autoComplete="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => { this.props.clearTextIfIsDefault( 'email' ,this.props.email ) }}
                        onChangeText={(text) => this.props.setText( 'email', text )}
                        onEndEditing={() => { this.props.checkTextIsNull( 'email', this.props.email ) }}
                    />
                    <TextInput 
                        style={styles.campoLogin}
                        value={this.props.senha}
                        textContentType={'password'}
                        secureTextEntry={this.props.escondeSenha}
                        onFocus={() => { this.props.clearTextIfIsDefault( 'senha' ,this.props.senha ) }}
                        onChangeText={(text) => this.props.setText( 'senha', text )}
                        onEndEditing={() => { this.props.checkTextIsNull( 'senha', this.props.senha ) }}
                    />
                    <Text style={styles.errorMenssage}>{mensagemErro}</Text>
                    <TouchableOpacity
                        onPress={ () => ( this.props.navigation.navigate('FormCadastro') ) }
                    >
                        <Text style={styles.linkCadastro}>
                            Ainda nao tem cadastro? Cadastre-se!
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else 
            return(
                <View style={styles.container}>
                    <TextInput 
                        style={styles.campoLogin}
                        value={this.props.email}
                        textContentType={'emailAddress'}
                        autoComplete="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => { this.props.clearTextIfIsDefault( 'email' ,this.props.email ) }}
                        onChangeText={(text) => this.props.setText( 'email', text )}
                        onEndEditing={() => { this.props.checkTextIsNull( 'email', this.props.email ) }}
                    />
                    <TextInput 
                        style={styles.campoLogin}
                        value={this.props.senha}
                        textContentType={'password'}
                        secureTextEntry={this.props.escondeSenha}
                        onFocus={() => { this.props.clearTextIfIsDefault( 'senha' ,this.props.senha ) }}
                        onChangeText={(text) => this.props.setText( 'senha', text )}
                        onEndEditing={() => { this.props.checkTextIsNull( 'senha', this.props.senha ) }}
                    />
                    <TouchableOpacity
                        onPress={ () => ( this.props.navigation.navigate('FormCadastro') ) }
                    >
                        <Text style={styles.linkCadastro}>
                            Ainda nao tem cadastro? Cadastre-se!
                        </Text>
                    </TouchableOpacity>
                </View>
            );
    }
}

const mapStateToProps = State => ({
    email: State.AuthReducer.email,
    senha: State.AuthReducer.senha,
    escondeSenha: !(State.AuthReducer.apresentaSenha),
    erroLogin: State.AuthReducer.erroLogin,
    tipoErro: State.AuthReducer.typeErroLogin
});

const mapDispatchToProps = {
    setText, 
    clearTextIfIsDefault,
    checkTextIsNull
}

const ConectedDivFormLogin = connect( mapStateToProps, mapDispatchToProps )( DivFormLogin );

const styles = StyleSheet.create({
    container: {
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
    }
});

export { ConectedDivFormLogin }