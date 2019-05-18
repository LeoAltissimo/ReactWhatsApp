import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'redux';

export class ConversationList extends React.Component {
  render() {
    return (
      <View 
        style={styles.conversationContainer}
      >
        <Text>TESTE</Text>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  conversationContainer: {
    flex: 1
  }
});