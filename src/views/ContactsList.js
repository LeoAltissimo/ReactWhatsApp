import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView
} from 'react-native';
import { connect } from 'redux';

const profileImage = require('../../assets/imgs/default-profile.png');

export class ContactsList extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView>
        {/* Add Contact part */}
        <Text style={styles.addContactTitle}>
          Adicionar Contato
        </Text>
        <View
          style={styles.addContactContainer}
          flexDirection="row"
          alignItems="center"
        >
          <View style={styles.addContactFieldContainer}>
            <TextInput 
              style={styles.fieldAddContact}
              value={''}
              placeholder="E-mail"
              textContentType={'emailAddress'}
              autoComplete="email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.addContactButtonContainer}>
            <Button
              title='Adicionar'
              color='#287f62'
              onPress={() => this.sendLogin()}
            />
          </View>
        </View>

        {/* Conversation part */}
        <ScrollView>
          <View
            style={styles.itemConversationContainer}
            flexDirection="row"
            alignItems="center"
          >
            <View>
              <Image 
                style={styles.conversationProfileImg}
                source={profileImage}
              />
            </View>
            <View>
              <Text>Nome contato</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = new StyleSheet.create({
  conversationContainer: {
    flex: 1
  },
  // Add contacts part
  addContactTitle: {
    marginTop: 8,
    marginLeft: 8,
    fontWeight: 'bold'
  },
  addContactContainer: {
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderColor: "#f2f2f2"
  },
  fieldAddContact: {
    color: '#4d4d4d',
    fontSize: 14,
    borderBottomColor: '#287f62',
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 20
  },
  addContactFieldContainer: {
    width: "60%",
    paddingRight: 8
  },
  addContactButtonContainer: {
    width: "40%",
    paddingHorizontal: 8
  },


  // Contatcts part
  itemConversationContainer: {
    padding: 8,
    borderBottomWidth: 0.5,
    borderColor: "#f2f2f2"
  },
  conversationProfileImg: {
    marginRight: 16,
    borderRadius: 50,
    width: 40,
    height: 40
  }
});