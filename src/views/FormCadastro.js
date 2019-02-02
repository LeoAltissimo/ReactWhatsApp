import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import { ConectedDivFormCadastro, ConectedDivBotao } from '../components/FormCadastro';

//imagem Background
const formLoginBackground = require('../../assets/imgs/formLoginBackground.jpg');

class FormCadastro extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return(
            <ImageBackground 
                source={formLoginBackground} 
                style={styles.container}
            >
                <ConectedDivFormCadastro />
                <ConectedDivBotao navigation={this.props.navigation}/>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export {FormCadastro}