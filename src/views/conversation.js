import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';

const backImg = require('../../assets/imgs/back-icon.png');
const genericProfile = require('../../assets/imgs/default-profile.png');
const sendIcon = require('../../assets/imgs/send-icon.png');
const backgroundMsg = require('../../assets/imgs/background.png');

const reciveIcon = require('../../assets/imgs/recive-tail.png');
const sendTail = require('../../assets/imgs/send-tail.png');

const Menssage = (props) => (
  <View style={style.mensageContainer}>
    <Image source={reciveIcon} style={style.tailMensage}/>
    <Text style={style.mensage}>Menssage</Text>
  </View>
);

const MenssageSend = (props) => (
  <View style={style.mensageContainerSend}>
    <Text style={style.mensageSend}>Menssage</Text>
    <Image source={sendTail} style={style.tailMensageSend}/>
  </View>
);


class Conversation extends React.Component {
  render() {
    return (
      <ImageBackground style={style.mainContainer} source={backgroundMsg}>
        <View style={style.headerBar}>
          <TouchableHighlight
            onPress={() => (this.props.navigation.navigate('TabMain'))}
          >
            <Image source={backImg} style={style.backIcon} />
          </TouchableHighlight>
          <Image source={genericProfile} style={style.contactProfile} />
          <Text style={style.contactName}>
            Nome do sujeto
          </Text>
        </View>

        <ScrollView style={style.conversationMensagesContainer}>
          <MenssageSend /> 
          <MenssageSend />
          <Menssage />
          <Menssage />
          <Menssage />
          <MenssageSend />
          <Menssage />
        </ScrollView>
        <KeyboardAvoidingView  behavior="padding">
          <View style={style.sendContainer}>
          <TextInput
            style={style.sendField}
            placeholder="Digite aqui..."
          />
          <TouchableHighlight style={style.sendButton}>
            <Image source={sendIcon} style={style.sendImage} />
          </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );

  }
}

const style = new StyleSheet.create({
  mainContainer: {
    backgroundColor: '#E5DDD5',
    flex: 1
  },
  conversationMensagesContainer: {
    flexDirection: "column-reverse",
    padding: 8
  },  
  headerBar: {
    backgroundColor: '#287f62',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10
  },
  backIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 6
  },
  contactProfile: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 6
  },
  contactName: {
    color: "#ffffff",
    fontWeight: 'bold'
  },
  sendButton: {
    backgroundColor: '#287f62',
    borderRadius: 50,
    padding: 6
  },
  sendImage: {
    width: 25,
    height: 25
  },
  sendField: {
    width: "88%",
    borderRadius: 50,
    backgroundColor: "#ffffff",
    paddingVertical: 5,
    paddingLeft: 12,
    marginRight: 6
  },
  sendContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  
  // mensage
  mensageContainer: {
    flexDirection: 'row',
    marginVertical: 6,
    maxWidth: "60%"
  },
  tailMensage: {
    width: 16,
    height: 16
  },
  mensage: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },

  // send
  mensageContainerSend: {
    flexDirection: 'row',
    marginVertical: 6,
    alignSelf: "flex-end",
    maxWidth: "60%"
  },
  tailMensageSend: {
    width: 16,
    height: 16
  },
  mensageSend: {
    backgroundColor: "#DCF8C6",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  }
})

export { Conversation }