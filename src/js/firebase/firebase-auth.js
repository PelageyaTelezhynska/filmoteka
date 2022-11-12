import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { initFireBase } from './utils';
import { refs } from '../refs';

initFireBase();
const auth = getAuth();
const provider = new GoogleAuthProvider();

//-------checked status of user, log in or log out--------
onAuthStateChanged(auth, user => {
  if (user) {
    if (user.emailVerified) {
      refs.modal.classList.add('is-hidden');
      refs.openModalAuthBtn.classList.add('is-hidden');
      refs.sigInGoogleBtn.classList.add('is-hidden');
      refs.signOutBtn.classList.remove('is-hidden');
      refs.userInfo.innerHTML = `
             <img src="${auth.currentUser.photoURL}" width="32" />
              <span>${user.displayName}</span>
            `;
    } else {
      refs.modal.classList.add('is-hidden');
      refs.openModalAuthBtn.classList.add('is-hidden');
      refs.sigInGoogleBtn.classList.add('is-hidden');
      refs.signOutBtn.classList.remove('is-hidden');
      refs.userInfo.innerHTML = `
              <img src="" width="32" />
              <span>${user.email}</span>
            `;
    }
  } else {
    console.log('User Is Out');
    refs.openModalAuthBtn.classList.remove('is-hidden');
    refs.sigInGoogleBtn.classList.remove('is-hidden');
    refs.signOutBtn.classList.add('is-hidden');
    refs.userInfo.innerHTML = ``;
  }
});

// -----------login form----------------//
refs.loginForm.addEventListener('submit', onSignIn);
// -----------Create User----------------//
refs.registerForm.addEventListener('submit', onCreateUser);
// -----------login with GOOGLE----------------//
refs.sigInGoogleBtn.addEventListener('click', GoogleSigIn);
// -----------logOut----------------//
refs.signOutBtn.addEventListener('click', onLogOut);

function onSignIn(e) {
  e.preventDefault();
  const login = e.target[0].value.trim();
  const password = e.target[1].value.trim();
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

function GoogleSigIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log('Sign-in with GOOGLE successful');
    })
    .catch(error => {
      console.log('Sign-in with GOOGLE error happened');
    });
}

function onCreateUser(e) {
  e.preventDefault();
  const email = e.target[0].value.trim();
  const password = e.target[1].value.trim();
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

function onLogOut() {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful');
    })
    .catch(error => {
      console.log('Sign-out error happened');
    });
}
