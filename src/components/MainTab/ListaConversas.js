import React, { Component } from 'react';
import {View, Text, ScrollView , FlatList, StyleSheet, Dimensions} from 'react-native';

let teste = [
    {
        nome: 'Teste 1',
        Hora: '10:20',
        ultimaMsg: 'Tudo Bem?'
    },
    {
        nome: 'Teste 2',
        Hora: '00:10',
        ultimaMsg: 'Tchaudfdsfsdfsdf'
    },
    {
        nome: 'Teste 3',
        Hora: '14:30',
        ultimaMsg: 'Ok Então'
    },
    {
        nome: 'Teste 4',
        Hora: '12:22',
        ultimaMsg: 'Beleza!'
    }
];

export class ListaConversas extends Component {
    render() {
        console.log( teste );
        return (
            <ScrollView style={styles.containerView} >
            <FlatList
                data={ teste }
                renderItem={ item => { 
                console.log( item );
                return(
                    <View style={styles.container}>
                        <Text style={styles.text} >{item.item.nome}</Text>
                        <View style={styles.lineContainer}>
                            <Text style={styles.subtext} >{item.item.ultimaMsg}</Text>
                            <Text style={styles.subtext} >{item.item.Hora}</Text>
                        </View>
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
        borderColor: '#eaeaea',
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
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: (width - 20)
    }
});
