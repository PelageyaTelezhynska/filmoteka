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
import Notiflix from 'notiflix';

initFireBase();
const auth = getAuth();
const provider = new GoogleAuthProvider();

//-------checked status of user, log in or log out--------
onAuthStateChanged(auth, user => {
  if (user) {
    refs.modal.classList.add('is-hidden');
    refs.openModalAuthBtn.classList.add('is-hidden');
    refs.sigInGoogleBtn.classList.add('is-hidden');
    refs.signOutBtn.classList.remove('is-hidden');
    refs.userInfo.innerHTML = `
              <span>${user.email}</span>
            `;
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
  const form = e.target;
  const login = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  signInWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notiflix.Notify.success(`Signin with ${user.email} successful`);
    })
    .catch(error => {
      Notiflix.Notify.failure(`Sign-in  error happened`);
    });
  form.reset();
}

function GoogleSigIn() {
  signInWithPopup(auth, provider)
    .then(userCredential => {
      const user = userCredential.user;
      Notiflix.Notify.success(`Sign-in with ${user.email} successful`);
    })
    .catch(error => {
      Notiflix.Notify.failure('Sign-in with Google account error happened');
    });
}

function onCreateUser(e) {
  e.preventDefault();
  const email = e.target[0].value.trim();
  const password = e.target[1].value.trim();
  const form = e.target;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notiflix.Notify.success(`User Created with email:${user.email}`);
    })
    .catch(error => {
      Notiflix.Notify.failure('User no created');
    });
  form.reset();
}

function onLogOut() {
  signOut(auth)
    .then(() => {})
    .catch(error => {});
}
