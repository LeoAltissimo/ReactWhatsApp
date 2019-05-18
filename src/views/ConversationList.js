import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'redux';

const profileImage = require('../../assets/imgs/default-profile.png');

export class ConversationList extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.conversationContainer}
      >
        <View
          style={styles.itemConversationContainer}
          justifyContent="space-between"
          flexDirection="row"
        >
          <View flexDirection="row">
            <View style={styles.profileContainer}>
              <Image
                style={styles.conversationProfileImg}
                source={profileImage}
              />
            </View>
            <View style={styles.infoMensageContainer}>
              <Text style={styles.udstedelse}>
                Nome da Pessoa Que enviou
            </Text>
              <Text>
                Pessoa: Ultima mensagem
            </Text>
            </View>
          </View>
          <View>
            <Text style={styles.timeMensage}>
              10:00
            </Text>
            <Text style={styles.unreadMensages}>
              5
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = new StyleSheet.create({
  conversationContainer: {
    flex: 1
  },
  itemConversationContainer: {
    padding: 8,
    borderBottomWidth: 0.5,
    borderColor: "#f2f2f2"
  },
  profileContainer: {
    marginRight: 16
  },
  udstedelse: {
    fontWeight: 'bold'
  },
  unreadMensages: {
    textAlign: 'center',
    backgroundColor: "#09D261",
    color: "#ffffff",
    borderRadius: 50
  },
  timeMensage: {
    color: "#09D261"
  },
  conversationProfileImg: {
    borderRadius: 50,
    width: 40,
    height: 40
  }
});