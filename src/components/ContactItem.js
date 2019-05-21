import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

const profileImage = require('../../assets/imgs/default-profile.png');

export default (props) => (
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
        <Text>{props.item.name}</Text>
        <Text>{props.item.email}</Text>
      </View>
    </View>
);

const styles = new StyleSheet.create({
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