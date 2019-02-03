import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { realizaLogin } from '../../redux/actions/AuthActions';

class DivBotao extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Button 
                    title='Entrar' 
                    color='#287f62'
                    onPress={ () => { 
                        this.props.realizaLogin (this.props.email, 
                                                 this.props.senha, 
                                                 this.props.navigation) 
                    } }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3, 
        width: '90%',
        justifyContent: 'flex-start',
    }
});

const mapStateTopProps = State => ({
    email: State.AuthReducer.email,
    senha: State.AuthReducer.senha
});

const mapDispathcToPropos = { realizaLogin };

const ConnectedDivButton = connect( mapStateTopProps, mapDispathcToPropos )( DivBotao );

export { ConnectedDivButton }