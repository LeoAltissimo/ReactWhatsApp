import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import b64 from 'base-64';

import {
    setEmailTopAdd,
    clearTextIfIsDefault,
    atualizaListaContatos
    
} from '../../redux/actions/ContatosActions';

class FormAddContato extends Component {
    VerifyUserInDb(){
        if( !(this.props.email) )
            return;

        uid = b64.encode( this.props.email );

        firebase.database().ref(`usuario/${uid}`).once('value')
        .then( query => {  
            if( (query.exists( )) )
                this.addContatoToBd( query, uid );
        } )
    } 

    addContatoToBd( query, uidContato ){
        uidUser = b64.encode( this.props.emailUser );
        firebase.database().ref(`usuario/${uidUser}/contatos/${uidContato}`)
           .set({nome: query.val( ).nome, email: this.props.email })
           .then( this.reloadListaContatos() )
    }

    reloadListaContatos(){
        uidUser = b64.encode( this.props.emailUser );

        firebase.database().ref(`usuario/${uidUser}/contatos`).once('value')
        .then( query => {  
            if( (query.exists( )) )
                this.props.atualizaListaContatos( query.val() );
            
                this.props.navigation.goBack()
        } )
    }

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
                        onFocus={ text => { this.props.clearTextIfIsDefault(text) }}
                        onChangeText={ text => { this.props.setEmailTopAdd(text) } }
                    />
                    <TouchableHighlight 
                        title='Adicionar' 
                        color='#287f62'
                        style={styles.botaoEmail}
                        onPress={ () => { this.VerifyUserInDb() } }
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
    email: State.ContatosReducer.emailToAdd,
    emailUser: State.AuthReducer.email
});

const mapDispatchToProps = {
    setEmailTopAdd,
    clearTextIfIsDefault,
    atualizaListaContatos
};

const ConnectedFormAdd = connect( mapStateToProps, mapDispatchToProps )( FormAddContato );

export { ConnectedFormAdd }