import React, { Component } from 'react';
import {View, Text, ScrollView , FlatList, StyleSheet, Dimensions} from 'react-native';
import { connect } from 'react-redux';


class ListaContatosObj extends Component {

    render() {
        return (
            <ScrollView style={styles.containerView} >
            <FlatList
                data={ this.props.contatos }
                renderItem={ item => { 
                console.log( item );
                return(
                    <View style={styles.container}>
                        <Text style={styles.text} >{item.item.nome}</Text>
                        <Text style={styles.subtext} >{item.item.email}</Text>
                    </View>
                );} }
            />
            </ScrollView> 
        );
    }
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    containerView: {
        width: width
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderColor: '#8e8e8e',
        margin: 5
    },
    text: {
        fontSize: 20,
        color: "#4d4d4d",
        fontWeight: 'bold',
        marginTop: 2
    },
    subtext: {
        fontSize: 14,
        color: "#a0a0a0",
        paddingBottom: 1,
        marginBottom: 2
    }
});

mapStateToProps = State => ({
    userEmail: State.AuthReducer.email,
    contatos: State.ContatosReducer.contatos
})

export const ListaContatos = connect( mapStateToProps, {} )( ListaContatosObj );