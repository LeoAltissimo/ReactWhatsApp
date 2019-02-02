import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { 
    setText, 
    clearTextIfIsDefault,
    checkTextIsNull
} from '../../redux/actions/AuthActions';

class DivFormCadastro extends Component {
    render() {
        if( this.props.erroCadastro ){
            
            let mensagemErro = '';

            switch( this.props.tipoErro ) {
                case 'auth/email-already-in-use':
                    mensagemErro = 'Este e-mail ja esta cadastrado. tente outro.';
                    break;
                case "auth/invalid-email":
                    mensagemErro = 'E-mail Inválido.';
                    break;  
                case 'auth/operation-not-allowed':
                    mensagemErro = 'E-mail ou senha Inválidos.';
                    break;  
                case 'auth/weak-password':
                    mensagemErro = 'Senha muito fraca';
                    break;  
                default:
                    mensagemErro = 'Erro ao realizar o cadastro';
                    break;
            }

            return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.nome}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'nome' , this.props.nome ) }}
                    onChangeText={(text) => this.props.setText( 'nome', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'nome', this.props.nome ) }}
                />
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.email}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'email' , this.props.email ) }}
                    onChangeText={(text) => this.props.setText( 'email', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'email', this.props.email ) }}
                />
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.senha}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'senha' , this.props.senha ) }}
                    onChangeText={(text) => this.props.setText( 'senha', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'senha', this.props.senha ) }}
                />
                <Text style={styles.errorMenssage}>{mensagemErro}</Text>
            </View>
            );

        } else {

            return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.nome}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'nome' , this.props.nome ) }}
                    onChangeText={(text) => this.props.setText( 'nome', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'nome', this.props.nome ) }}
                />
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.email}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'email' , this.props.email ) }}
                    onChangeText={(text) => this.props.setText( 'email', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'email', this.props.email ) }}
                />
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.senha}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'senha' , this.props.senha ) }}
                    onChangeText={(text) => this.props.setText( 'senha', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'senha', this.props.senha ) }}
                />
            </View>
            );
        }
    }
}

const mapStatesToProps = State => ({
    nome: State.AuthReducer.nome,
    email: State.AuthReducer.email,
    senha: State.AuthReducer.senha,
    erroCadastro: State.AuthReducer.erroCadastro,
    tipoErro: State.AuthReducer.typeErroCadastro
});

const mapDispatchToProps = {
    setText, 
    clearTextIfIsDefault,
    checkTextIsNull
}

const ConectedDivFormCadastro = connect( mapStatesToProps, mapDispatchToProps )( DivFormCadastro );

const styles = StyleSheet.create({
    container: {
        flex: 5, 
        justifyContent: 'center',
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
        fontSize: 12
    }
});

export { ConectedDivFormCadastro }