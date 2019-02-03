import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

// Components Import
import { DivTopo, ConectedDivFormLogin, ConnectedDivButton } from '../components/FormLogin';

const formLoginBackground = require('../../assets/imgs/formLoginBackground.jpg');

class FormLogin extends React.Component {
    static navigationOptions = {
        header: null
    }
    render(){
        return(
        <ImageBackground 
            source={formLoginBackground} 
            style={styles.container}
        >
            <DivTopo />
            <ConectedDivFormLogin navigation={this.props.navigation}/>
            <ConnectedDivButton navigation={this.props.navigation} />
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

export { FormLogin }