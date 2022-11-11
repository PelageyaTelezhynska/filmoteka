import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { initFireBase } from './utils';

initFireBase();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function onSignIn(e) {
  e.preventDefault();
  const login = e.target[0].value;
  const password = e.target[1].value;
  signInWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('Sign-in with login successful');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Sign-in with login error happened', errorCode, errorMessage);
    });
}

export function GoogleSigIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log('Sign-in with GOOGLE successful');
    })
    .catch(error => {
      console.log('Sign-in with GOOGLE error happened');
    });
}

export function onCreateUser(e) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const form = e.target;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      form.reset();
      console.log('USER CREATED');
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

export function onLogOut() {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful');
    })
    .catch(error => {
      console.log('Sign-out error happened');
    });
}
