import firebase from 'firebase';
import b64 from 'base-64';

/**
 * Summary: Set value of id to load a new conversation
 * @param {String} recipientEmailid | E-mail of contact to start conversation
 * @param {String} recipientId | Id of contact to open conversation
 */
export const newConversation = (recipientEmailid, recipientId= null) => {
  let uid = '';

  if( !recipientId )
    uid = b64.encode(recipientEmailid);

  return ({ type: "CONVERSATION_NEW_RECIPIENT", payload: recipientId || uid });
}

/**
 * Summary: Load conversation data and mensages if exists
 * @param {String} recipientUid | id of contact to start conversation
 * @param {string} uid | id of actual user
 */
export const LoadConversation = (recipientUid, uid) => async dispatch => {
  dispatch({ type: "CONVERSATION_GET_INFO_LOADING" });

  firebase.database().ref(`user/${uid}/conversations/${recipientUid}`).once('value')
    .then(data => {
      if (data.val()) {
        dispatch({ type: "CONVERSATION_GET_INFO_SUCCESS", payload: data.val() });

        firebase.database().ref(`/chat/${data.val().chatKey}`).on('value',
          dataChat => dispatch({ type: "CONVERSATION_GET_CHAT", payload: Object.values(dataChat.val()) })
        )
          .catch(err => dispatch({ type: "CONVERSATION_GET_CHAT_ERROR" }));
      } else {
        console.log("CONVERSATION_GET_INFO_EMPTY");
        dispatch({ type: "CONVERSATION_GET_INFO_EMPTY" })
      }
    })
    .catch(err => dispatch({ type: "CONVERSATION_GET_INFO_ERROR" }))
}

/**
 * Summary: Create a new conversation structure and send first Mensage
 * @param {String} recipientUid | id of contact to start conversation
 * @param {string} uid | id of actual user
 * @param {string} msg | Mensage to send
 */
export const startNewConversation = (recipientUid, uid, msg) => async dispatch => {

  const newChatKey = firebase.database().ref().child('chat').push().key;
  var userName = '', recipeinetName = '';

  await firebase.database().ref(`user/${uid}`).once('value')
    .then(snapshot => userName = snapshot.val().name);

  await firebase.database().ref(`user/${recipientUid}`).once('value')
    .then(snapshot => recipeinetName = snapshot.val().name);

  const mensage = {
    sentBy: uid,
    mensage: msg,
    date: Date.now()
  }

  const userConversation = {
    recipientUid: recipientUid,
    recipientName: recipeinetName,
    lastMensage: mensage,
    chatKey: newChatKey
  }

  const recipientConversation = {
    recipientUid: uid,
    recipientName: userName,
    lastMensage: mensage,
    chatKey: newChatKey
  }

  firebase.database().ref(`chat/${newChatKey}`).push(mensage);

  firebase.database().ref(`/chat/${newChatKey}`).on('value',
    dataChat => dispatch({ type: "CONVERSATION_GET_CHAT", payload: Object.values(dataChat.val()) })
  )

  let updates = {};
  updates[`user/${uid}/conversations/${recipientUid}`] = userConversation;
  updates[`user/${recipientUid}/conversations/${uid}`] = recipientConversation;

  firebase.database().ref().update(updates)
    .then(data => {
      dispatch({ type: "CONVERSATION_SET_NEW_SUCCESS", payload: userConversation })
    })
    .catch(err => dispatch({ type: "CONVERSATION_SET_NEW_ERROR", payload: err }))
}

/**
 * Summary: Send a message to a exists conversation
 * @param {string} uid | id of actual user
 * @param {String} recipientUid | id of contact to start conversation
 * @param {String} chatKey | id of chat
 * @param {string} msg | Mensage to send
 */
export const sendMensage = (uid, recipientUid, chatKey, msg) => async dispatch => {
  const mensage = {
    sentBy: uid,
    mensage: msg,
    date: Date.now()
  }
  
  var userName = '', recipeinetName = '';

  await firebase.database().ref(`user/${uid}`).once('value')
    .then(snapshot => userName = snapshot.val().name);

  await firebase.database().ref(`user/${recipientUid}`).once('value')
    .then(snapshot => recipeinetName = snapshot.val().name);

  const userConversation = {
    recipientUid: recipientUid,
    recipientName: recipeinetName,
    lastMensage: mensage,
    chatKey: chatKey
  }

  const recipientConversation = {
    recipientUid: uid,
    recipientName: userName,
    lastMensage: mensage,
    chatKey: chatKey
  }

  let updates = {};
  updates[`user/${uid}/conversations/${recipientUid}`] = userConversation;
  updates[`user/${recipientUid}/conversations/${uid}`] = recipientConversation;

  firebase.database().ref().update(updates)

  firebase.database().ref(`chat/${chatKey}`).push(mensage)
    .then(dataChat => dispatch({ type: "CONVERSATION_PUT_CHAT" }))
    .catch(err => dispatch({ type: "CONVERSATION_PUT_CHAT_ERROR" }));
}