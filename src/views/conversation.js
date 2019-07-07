import React from 'react';
import { connect } from 'react-redux';
import * as ConversationActions from '../redux/converation/conversationActions';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  AsyncStorage
} from 'react-native';

const backImg = require('../../assets/imgs/back-icon.png');
const genericProfile = require('../../assets/imgs/default-profile.png');
const sendIcon = require('../../assets/imgs/send-icon.png');

const reciveIcon = require('../../assets/imgs/recive-tail.png');
const sendTail = require('../../assets/imgs/send-tail.png');

const Menssage = (props) => (
  <View style={style.mensageContainer}>
    <Text style={style.mensage}>{props.item.mensage}</Text>
  </View>
);

const MenssageSend = (props) => (
  <View style={style.mensageContainerSend}>
    <Text style={style.mensageSend}>{props.item.mensage}</Text>
  </View>
);


class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mensage: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('uid', (err, result) => {
      if( result ) {
        this.props.LoadConversation( this.props.recipientUid, result );
      }
    });
  }

  sendMensage() {
    const { 
      chatInfo, 
      recipientUid,
      sendMensage,
      startNewConversation,
    } = this.props;

    AsyncStorage.getItem('uid', (err, result) => {
      if( result ) {
        if( chatInfo.chatKey) {
          sendMensage(result, recipientUid, chatInfo.chatKey, this.state.mensage);
        } else {
          startNewConversation( recipientUid, result, this.state.mensage );
        }
      }

      this.setState({mensage: ''});
    });
  }

  handleRecipientName() {
    const { chatInfo } = this.props;

    if( chatInfo ) 
      return chatInfo.recipientName;
    else 
      return "Name";
  }

  renderMensages() {
    const { chat, chatInfo } = this.props;
    let chatList = [];

    if( chat && chat.length > 0 )
      chat.map((item, index) => {
        if( chatInfo.recipientUid === item.sentBy )
          chatList.push(<Menssage item={item} key={index}/>);
        else
          chatList.push(<MenssageSend item={item} key={index}/>);
      })

    return chatList;
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <View style={style.headerBar}>
          <TouchableHighlight
            onPress={() => (this.props.navigation.navigate('TabMain'))}
          >
            <Image source={backImg} style={style.backIcon} />
          </TouchableHighlight>
          <Image source={genericProfile} style={style.contactProfile} />
          <Text style={style.contactName}>
            {this.handleRecipientName()}
          </Text>
        </View>

        <ScrollView 
          contentContainerStyle={style.conversationMensagesContainer} 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
          this.scrollView.scrollToEnd({animated: true});
        }}>
          {this.renderMensages()}
        </ScrollView>
        
        <KeyboardAvoidingView  behavior="padding">
          <View style={style.sendContainer}>
          <TextInput
            style={style.sendField}
            value={this.state.mensage}
            onChangeText={(e) => this.setState({mensage: e})}
            placeholder="Digite aqui..."
          />
          <TouchableHighlight 
            style={style.sendButton} 
            onPress={() => this.sendMensage()}
          >
            <Image source={sendIcon} style={style.sendImage} />
          </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    );

  }
}

const style = new StyleSheet.create({
  mainContainer: {
    backgroundColor: '#E8EBFF',
    flex: 1
  },
  conversationMensagesContainer: {
    flexDirection: 'column',
    padding: 8
  },  
  headerBar: {
    backgroundColor: '#3F51B5',
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
    backgroundColor: '#FBC02D',
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
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 8,
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
    backgroundColor: '#8090EB',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
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
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  }
})

const mapStateToProps = store => ({
  recipientUid: store.Conversation.recipientUid,
  chatInfo: store.Conversation.chatInfo,
  chat: store.Conversation.chat,
  conversationLoading: store.Conversation.conversationLoading,
  conversationError: store.Conversation.conversationError,
  newConversation: store.Conversation.newConversation
});

const mapDispatchToProps = {
  ...ConversationActions
};

const ConnectedConversation = connect(mapStateToProps, mapDispatchToProps)(Conversation);

export { ConnectedConversation }