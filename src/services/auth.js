import firebase from 'firebase';

// Make the request login with email and password to firebase
// @data objet with email and passord
export const authLogin = data => (
  new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(() => resolve())
      .catch(err => reject(err))
  })
);

// Make the request to signup a new user on firebaseAPI
// @data objet with email and passord
export const authSignup = data => (
  new Promise((reoslve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(() => reoslve())
      .catch(err => reject(err))
  })
)

// Post user information on firebase database
// @data object wit idUser (email on b64) and name user
export const authPostNewUser = data => (
  new Promise((reoslve, reject) => {
    firebase.database().ref(`user/${data.idUser}`).set({ name: data.name })
      .then(() => reoslve())
      .catch(err => reject(err))
  })
)