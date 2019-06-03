import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const profileImage = require('../../assets/imgs/default-profile.png');

export default (props) =>{ 
  const convertDate = (date) => {
    var dt = new Date(date);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    return hr+ ':' + m.substr(-2); 
  }
  
  return (
  <TouchableOpacity
    onPress={() => {
      props.openConversation(props.item.recipientUid)
    }}
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
            {props.item.recipientName}
            </Text>
          <Text>
            {props.item.lastMensage.mensage}
            </Text>
        </View>
      </View>
      <View>
        <Text style={styles.timeMensage}>
          {convertDate(props.item.lastMensage.date)}
        </Text>
        {/* <Text style={styles.unreadMensages}>
          5
        </Text> */}
      </View>
    </View>
  </TouchableOpacity>
)};

const styles = new StyleSheet.create({
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