import React from 'react';
import { View } from 'react-native';

import { Header, ConnectedFormAdd } from '../components/AddContato/';

export const AddContato = props => (
    <View>
        <Header navigation={props.navigation}/>
        <ConnectedFormAdd />
    </View>
);