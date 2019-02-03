import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
    realizaCadastro
} from '../../redux/actions/AuthActions';

const DivBotao = props => (
    <View style={styles.container}>
        <Button 
            title='Cadastrar' 
            color='#287f62'
            onPress={ () => { props.realizaCadastro( props.email, props.senha, props.navigation ) } }
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 3, 
        width: '90%',
        justifyContent: 'flex-start',
    }
});

const mapStatesToProps = State => ({
    nome: State.AuthReducer.nome,
    email: State.AuthReducer.email,
    senha: State.AuthReducer.senha
});

const mapDispatchToProps = { realizaCadastro };

const ConectedDivBotao = connect( mapStatesToProps, mapDispatchToProps )( DivBotao );

export { ConectedDivBotao }