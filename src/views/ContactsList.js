import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import * as contactActions from '../redux/contacts/contactsActions';
import { newConversation } from '../redux/converation/conversationActions';
import ContactItem from "../components/ContactItem";

const profileImage = require('../../assets/imgs/default-profile.png');

class ContactsList extends React.Component {
  componentWillMount() {
    AsyncStorage.getItem('emailUser', (err, result) => {
      this.props.getContactsList(result);
    });
  }

  addNewContact() {
    const {
      email,
      addNewContact,
      setNewContactEmailError
    } = this.props;

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      setNewContactEmailError("E-mail Inválido.");
      return false;
    }

    AsyncStorage.getItem('emailUser', (err, result) => {
      if (result) {
        if (result !== email) {
          addNewContact(email, result);
          return true;
        }
        else {
          setNewContactEmailError("Mesmo email desta conta.");
          return false;
        }
      }
      setNewContactEmailError("Erro! Tente realizar seu login novamente.");
      return false;
    });

  }

  openConversation(email) {
    this.props.newConversation(email);
    this.props.navigation.navigate('Conversation')
  }

  renderContacts() {
    const { contactList } = this.props;
    let contactListElm;

    if (contactList && contactList.length > 0) {
      contactListElm = contactList.map((item, index) =>
        (
        <ContactItem 
          item={item} 
          openConversation={this.openConversation.bind(this)}
          key={index}
         />
        )
      );
    }

    return contactListElm;
  }

  render() {
    return (
      <View>
        <View>
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
                value={this.props.email}
                placeholder="E-mail"
                textContentType={'emailAddress'}
                autoComplete="email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => this.props.setNewContactEmail(text)}
              />
              {/* Add contact error mensage */}
              {this.props.addContactError &&
                <Text style={styles.errorMenssage}>
                  {this.props.addContactError}
                </Text>
              }
            </View>
            <View style={styles.addContactButtonContainer}>
              <Button
                title='Adicionar'
                color='#FBC02D'
                onPress={() => this.addNewContact()}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          {this.renderContacts()}
        </ScrollView>
      </View>
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
    fontWeight: '100',
    borderColor: '#3F51B5',
    borderWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 10,
    marginVertical: 6

    // color: '#4d4d4d',
    // fontSize: 14,
    // borderBottomColor: '#287f62',
    // borderBottomWidth: 1,
    // width: "100%",
    // marginVertical: 6
  },
  addContactFieldContainer: {
    width: "60%",
    paddingRight: 8
  },
  addContactButtonContainer: {
    width: "40%",
    paddingHorizontal: 8
  },
  errorMenssage: {
    color: '#ff0000',
    fontSize: 11,
    marginBottom: 8
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

const mapStateToProps = store => ({
  email: store.ContactsReducer.newContactEmail,
  addContactError: store.ContactsReducer.addContactError,
  //
  contactList: store.ContactsReducer.contactList
});

const mapDispatchToProps = {
  ...contactActions,
  newConversation
};

const ConnectedContactsList =
  connect(mapStateToProps, mapDispatchToProps)(ContactsList);

export { ConnectedContactsList }