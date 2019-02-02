import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DivTopo = props => (
    <View style={styles.container}>
        <Text style={styles.titulo}>
            WhatsApp De Moreno
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 4, 
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    }
});

export { DivTopo }