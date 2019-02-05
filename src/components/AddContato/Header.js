import React, { Componenet } from 'react';
import { View, Text, TouchableHighlight, StyleSheet , Image} from 'react-native';

const voltarImgBack = require('../../../assets/imgs/back-btn-80-80.png');

export const Header = props => (
    <View style={styles.container}>
        <TouchableHighlight 
            style={styles.backButtonContainer}
            underlayColor='#287f62'
            activeOpacity={0.55}
            onPress={() => {props.navigation.goBack()}}
        >
            <Image source={voltarImgBack} style={styles.bckImg}/>
        </TouchableHighlight>
        <Text style={styles.txtContainer}>
            Adicionar Contato
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: "#287f62",
        flexDirection: 'row'
    },
    backButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bckImg: {
        width: 25,
        height: 25
    },
    txtContainer: {
        flex: 5,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 30
    }

});