import firebase from 'firebase';

/**
 * Summary: Get convestion list of user
 * @param {String} uid | E-mail of atual user
 */
export const getConversationList = (uid = null) => async dispatch => {
  if (!uid)
    return;

  dispatch({ type: "CONVERSATION_LIST_LOADING" });

  await firebase.database().ref(`user/${uid}/conversations`).on('value', data => {
      if(data.val())
        dispatch({ type: "CONVERSATION_LIST_SUCCESS", payload: Object.values(data.val()) })
    })
    .catch(err => dispatch({ type: "CONVERSATION_LIST_ERROR", payload: err }));
}