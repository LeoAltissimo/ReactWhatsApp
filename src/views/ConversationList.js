import React from 'react';
import {
  StyleSheet,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import * as conversationListActions from '../redux/conversationList/conversationListActions';
import { newConversation } from '../redux/converation/conversationActions';
import ConversationItem from "../components/ConversationItem";

class ConversationList extends React.Component {
  componentDidMount() {
    AsyncStorage.getItem('uid', (err, result) => {
      this.props.getConversationList(result);
    });
  }

  openConversation(uid) {
    this.props.newConversation(null, uid);
    this.props.navigation.navigate('Conversation')
  }

  renderConversations() {
    const { conversationList } = this.props;
    let contactListElm;

    if(conversationList && conversationList.length > 0) {
      contactListElm = conversationList.map((item, index) => (
        <ConversationItem 
          item={item} 
          openConversation={this.openConversation.bind(this)}
          key={index}
         />
      ));
    }

    return contactListElm;
  }

  render() {
    return (
      <ScrollView
        style={styles.conversationContainer}
      >
        {this.renderConversations()}
      </ScrollView>
    );
  }
}

const styles = new StyleSheet.create({
  conversationContainer: {
    flex: 1
  }
});

const mapStateToProps = store => ({
  conversationList: store.ConversationList.conversationList,
  conversationListLoading: store.ConversationList.conversationListLoading,
  conversationListError: store.ConversationList.conversationListError
});

const mapDispatchToProps = {
  ...conversationListActions,
  newConversation
};

const ConnectedConversationList =
  connect(mapStateToProps, mapDispatchToProps)(ConversationList);

export { ConnectedConversationList }