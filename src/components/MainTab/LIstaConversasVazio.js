import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';

export class LIstaConversasVazio extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.message}>
                    Ainda não existe nenhuma 
                </Text>
                <Text style={styles.message}> 
                    conversa salva.
                </Text>
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