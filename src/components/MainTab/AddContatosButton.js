import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

export class AddContatosButon extends Component {
    render() {
        return (
            <TouchableHighlight 
                style={styles.addbuttonContainer} 
                underlayColor='#287f62'
                activeOpacity={0.55}
                onPress={ () => { 
                    this.props.navigation.navigate('AddContato') 
                } }
            >
                <Text style={styles.addbuttonText}>
                    +
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    addbuttonContainer: {
        position:'absolute',
        alignSelf:'flex-end',
        backgroundColor: "#287f62",
        borderRadius: 50,
        right: 15,
        bottom:15,
        width: 65, 
        height: 65
    },
    addbuttonText: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 1.5
    }
});