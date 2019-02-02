import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

class DivBotao extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Button 
                    title='Entrar' 
                    color='#287f62'
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

export { DivBotao }