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
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.email}
                    onFocus={() => { this.props.clearTextIfIsDefault( 'email' ,this.props.email ) }}
                    onChangeText={(text) => this.props.setText( 'email', text )}
                    onEndEditing={() => { this.props.checkTextIsNull( 'email', this.props.email ) }}
                />
                <TextInput 
                    style={styles.campoLogin}
                    value={this.props.senha}
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
    senha: State.AuthReducer.senha
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
    }
});

export { ConectedDivFormLogin }