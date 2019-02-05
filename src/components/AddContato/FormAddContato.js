import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native';
import { connect } from 'react-redux'

import {
    setEmailTopAdd
} from '../../redux/actions/ContatosActions';

class FormAddContato extends Component {
    render() {
        return(
            <View style={{backgroundColor: '#efefef'}}>
                <Text style={styles.tituloTxt}>Email do contato:</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.campoEmail}
                        value={this.props.email}
                        textContentType={'emailAddress'}
                        autoComplete="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={ text => { this.props.setEmailTopAdd(text) } }
                    />
                    <TouchableHighlight 
                        title='Adicionar' 
                        color='#287f62'
                        style={styles.botaoEmail}
                        onPress={ () => false }
                    >
                        <Text style={styles.textBtn}>Adicionar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tituloTxt: {
        color: '#4d4d4d',
        fontSize: 18,
        marginHorizontal: 10,
        marginTop: 30
    },
    inputContainer: {
        flexDirection: 'row',
        height: 50,
        justifyContent : 'flex-end',
        alignItems: 'flex-end'
    },
    campoEmail: {
        color: '#4d4d4d',
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomColor: '#287f62',
        borderBottomWidth: 2,
        marginHorizontal: 10,
        flex: 7
    },
    botaoEmail: {
        flex: 3,
        marginHorizontal: 8,
        backgroundColor: '#287f62',
        borderRadius: 5,
        padding: 5
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const mapStateToProps = State => ({
    email: State.ContatosReducer.emailToAdd
});

const mapDispatchToProps = {
    setEmailTopAdd
};

const ConnectedFormAdd = connect( mapStateToProps, mapDispatchToProps )( FormAddContato );

export { ConnectedFormAdd }