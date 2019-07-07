import firebase from 'firebase';
import b64 from 'base-64';

/**
 * Summary: Set value of login/signup email field
 * @param {String} value | New value to login/signup email
 */
export const setNewContactEmail = (value = null) => {
  if (value !== null)
    return { type: "CONTACTS_SET_EMAIL_TO_ADD", payload: value }
}

/**
 * Summary: Action wait the promise to save a new contact on FirebaseAPI 
 * @param {String} email     | E-mail of contact to add
 * @param {String} userEmail | E-mail of atual user
 */
export const addNewContact = (email = null, userEmail) => async dispatch => {
  if(!email)
    return;

  dispatch({ type: "CONTACTS_ADD_NEW_LOADING" });

  let addUid = b64.encode(email),
      uid = b64.encode(userEmail);

  firebase.database().ref(`user/${addUid}`).once('value')
    .then((data) => {
      if( data.val() ) {
        firebase.database().ref(`user/${uid}/contacts/${addUid}`).once('value')
          .then(userExistis => {
            if( userExistis.val() === null ) {
              let updates = {};
              updates[`user/${uid}/contacts/${addUid}`] = {email: email, name: data.val().name};
              firebase.database().ref().update(updates);

              dispatch({ type: "CONTACTS_ADD_NEW_SUCCESS" });
            } else {
              dispatch({ 
                type: "CONTACTS_ADD_NEW_ERROR", 
                payload: "Erro, contato ja existe." 
              });
            }
          })
          .catch(err => {
            dispatch({ 
              type: "CONTACTS_ADD_NEW_ERROR", 
              payload: "Erro, ao consultar os contatos." 
            });
          });
      } else {
        dispatch({ 
          type: "CONTACTS_ADD_NEW_ERROR", 
          payload: "Erro, contato não existe." 
        });
      }
    })
    .catch(err => {
      dispatch({ 
        type: "CONTACTS_ADD_NEW_ERROR", 
        payload: "Erro, ao consultar o usuarui do contato." 
      });
    })
} 

/**
 * Summary: Set a error ocurred on try to add contact
 * @param {String} error 
 */
export const setNewContactEmailError = (error = null) => {
  if(error)
    return { type: "CONTACTS_SET_ERROR", payload: error }
}

/**
 * Summary: Action wait the promise to get the contact list of user
 * @param {String} userEmail | E-mail of atual user
 */
export const getContactsList = (userEmail = null) => async dispatch =>{
  if(!userEmail)
    return;

  let uid = b64.encode(userEmail);

  await firebase.database().ref(`user/${uid}/contacts`).on('value', data => {
    if(data.val())
      dispatch({ type: "CONTACTS_GET_LIST_SUCCESS", payload: Object.values(data.val())})
    })
    .catch(err => dispatch({ type: "CONTACTS_GET_LIST_ERROR" }));
}