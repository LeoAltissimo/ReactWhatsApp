import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

class Conversas extends Component {
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

class Contatos extends Component {
    static navigationOpitions = {
        header: null,
        headerTitle: "Contatos"
    }
    render() {
        return (
            <SafeAreaView>
                <Text>Contatos</Text>
            </SafeAreaView>
        );
    }
}

export const TabMain = createMaterialTopTabNavigator(
    {
        TabConversas: Conversas,
        TabContatos: Contatos
    },
    {
        tabBarOptions: {
            scrollEnabled: false,
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#287f62',
                justifyContent: 'center',
                paddingTop: 30
            },
            indicatorStyle: {
                backgroundColor: '#fff'
            },
        },
        initialRouteName: 'TabConversas'
    }
);