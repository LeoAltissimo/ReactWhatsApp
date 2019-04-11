import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { 
    AddContatosButon,
    ListaContatosVazio,
    ListaContatos,
    LIstaConversasVazio,
    ListaConversas
} from '../components/MainTab/';

import { reloadListaContatos } from '../redux/actions/ContatosActions';

export class Conversas extends Component {
    static navigationOpitions = {
        header: null,
        headerTitle: "Conversas"
    }
    render() {
        if( false )
        return (
            <View>
                <StatusBar translucent={false} backgroundColor="#C2185B" barStyle="light-content" />
                <LIstaConversasVazio />
            </View>
        );

        return (
            <View style={{ 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' 
            }} >
                <StatusBar translucent={false} backgroundColor="#C2185B" barStyle="light-content" />
                <ListaConversas />
            </View>
        );
    }
}

class ContatosCmpnt extends Component {
    static navigationOpitions = {
        header: null,
        headerTitle: "Contatos"
    }

    componentWillMount(){
        console.log('reloldando');
        this.props.reloadListaContatos( this.props.userEmail );
    }

    render() {
        console.log(this.props.existsContatcs);
        if( !this.props.existsContatcs )
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
        else
            return (
                <View style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center' 
                }}>
                    <ListaContatos />
                    <AddContatosButon navigation={this.props.navigation}/>
                </View>
            );
    }
}

const mapStateToProps = State => ({
    existsContatcs: State.ContatosReducer.existsContatcs,
    userEmail: State.AuthReducer.email,
})

export const Contatos = connect( mapStateToProps, {reloadListaContatos} )( ContatosCmpnt );