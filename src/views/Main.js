import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { 
    AddContatosButon,
    ListaContatosVazio
} from '../components/MainTab/';

export class Conversas extends Component {
    static navigationOpitions = {
        header: null,
        headerTitle: "Conversas"
    }
    render() {
        return (
            <SafeAreaView>
                <StatusBar translucent={false} backgroundColor="#C2185B" barStyle="light-content" />
                <Text>Conversas</Text>
            </SafeAreaView>
        );
    }
}

export class Contatos extends Component {
    static navigationOpitions = {
        header: null,
        headerTitle: "Contatos"
    }
    render() {
        return (
            <View style={{ 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' 
            }}>
                <ListaContatosVazio navigation={this.props.navigation}/>
                <AddContatosButon navigation={this.props.navigation}/>
            </View>
        );
    }
}