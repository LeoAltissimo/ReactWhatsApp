import firebase from 'firebase';
import b64 from 'base-64';

export const authLogin = data => (
  new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(() => resolve())
      .catch(err => reject(err))
  })
);