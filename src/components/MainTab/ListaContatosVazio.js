import React, { Component } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export class ListaContatosVazio extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.message}>
                    Ainda não existe nenhum contato salvo.
                </Text>
                <Button 
                    color="#287f62"
                    title="Adicionar Contato"
                    onPress={ () => { this.props.navigation.navigate('AddContato')} }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        fontSize: 18,
        color: "#4d4d4d",
        textAlign: 'center',
        marginBottom: 8
    }
});